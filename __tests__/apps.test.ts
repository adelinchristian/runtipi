import { expect, test, describe } from "bun:test";
import { appInfoSchema, dynamicComposeSchema } from '@runtipi/common/schemas'
import { fromError } from 'zod-validation-error';
import fs from 'node:fs'
import path from 'node:path'

const getApps = async () => {
  const appsDir = await fs.promises.readdir(path.join(process.cwd(), 'apps'))

  const appDirs = appsDir.filter((app) => {
    const stat = fs.statSync(path.join(process.cwd(), 'apps', app))
    return stat.isDirectory()
  })

  return appDirs
};

const getFile = async (app: string, file: string) => {
  const filePath = path.join(process.cwd(), 'apps', app, file)
  try {
    const file = await fs.promises.readFile(filePath, 'utf-8')
    return file
  } catch (err) {
    return null
  }
}

describe("each app should have the required files", async () => {
  const apps = await getApps()

  for (const app of apps) {
    const files = ['config.json', 'docker-compose.json', 'metadata/logo.jpg', 'metadata/description.md']

    for (const file of files) {
      test(`app ${app} should have ${file}`, async () => {
        const fileContent = await getFile(app, file)
        expect(fileContent).not.toBeNull()
      })
    }
  }
})

describe("each app should have a valid config.json", async () => {
  const apps = await getApps()

  for (const app of apps) {
    test(`app ${app} should have a valid config.json`, async () => {
      const fileContent = await getFile(app, 'config.json')
      const parsed = appInfoSchema.omit({ urn: true }).safeParse(JSON.parse(fileContent || '{}'))

      if (!parsed.success) {
        const validationError = fromError(parsed.error);
        console.error(`Error parsing config.json for app ${app}:`, validationError.toString());
      }

      expect(parsed.success).toBe(true)
    })
  }
})

test("OpenTubeX shares a 16-character companion key", async () => {
  const config = JSON.parse((await getFile("opentubex", "config.json")) || '{}')
  const compose = JSON.parse((await getFile("opentubex", "docker-compose.json")) || '{}')
  const invidious = compose.services.find((service: { name: string }) => service.name === "invidious")
  const companion = compose.services.find((service: { name: string }) => service.name === "companion")
  const invidiousConfig = invidious.environment.find((entry: { key: string }) => entry.key === "INVIDIOUS_CONFIG").value
  const companionKey = companion.environment.find((entry: { key: string }) => entry.key === "SERVER_SECRET_KEY").value
  const keyName = /^\$\{([A-Z0-9_]+)\}$/.exec(companionKey)?.[1]
  const field = config.form_fields.find((entry: { env_variable: string }) => entry.env_variable === keyName)

  expect(invidiousConfig).toContain(`invidious_companion_key: "${companionKey}"`)
  expect(field).toMatchObject({ type: "random", encoding: "hex", min: 16, max: 16 })
})

test("OpenTubeX Sync preserves its database and account secret", async () => {
  const config = JSON.parse((await getFile("opentubex-sync", "config.json")) || '{}')
  const compose = JSON.parse((await getFile("opentubex-sync", "docker-compose.json")) || '{}')
  const service = compose.services.find((entry: { isMain?: boolean }) => entry.isMain)
  const secret = config.form_fields.find((entry: { env_variable: string }) => entry.env_variable === "OPENTUBEX_SYNC_SECRET")
  const environment = Object.fromEntries(service.environment.map((entry: { key: string, value: string }) => [entry.key, entry.value]))

  expect(secret).toMatchObject({ type: "random", encoding: "hex", min: 64 })
  expect(environment.SECRET_KEY).toBe(`\${${secret.env_variable}}`)
  expect(environment.USERNAME_SECRET).toBe(environment.SECRET_KEY)
  expect(environment.DATABASE_URL).toBe("./data/db.sqlite")
  expect(service.volumes).toContainEqual({ hostPath: "${APP_DATA_DIR}/data", containerPath: "/app/data" })
  expect(await getFile("opentubex-sync", "data/.gitkeep")).not.toBeNull()
})

test("Tuliprox prepares persistent setup and data directories", async () => {
  const compose = JSON.parse((await getFile("tuliprox", "docker-compose.json")) || '{}')
  const service = compose.services.find((entry: { isMain?: boolean }) => entry.isMain)

  for (const directory of ["config", "data", "backup", "downloads", "cache"]) {
    expect(service.volumes).toContainEqual({
      hostPath: `\${APP_DATA_DIR}/data/${directory}`,
      containerPath: `/app/${directory}`
    })
    expect(await getFile("tuliprox", `data/${directory}/.gitkeep`)).not.toBeNull()
  }
})

describe("each app should have a valid docker-compose.json", async () => {
  const apps = await getApps()

  for (const app of apps) {
    test(`app ${app} should have a valid docker-compose.json`, async () => {
      const fileContent = await getFile(app, 'docker-compose.json')
      const parsed = dynamicComposeSchema.safeParse(JSON.parse(fileContent || '{}'))

      if (!parsed.success) {
        const validationError = fromError(parsed.error);
        console.error(`Error parsing docker-compose.json for app ${app}:`, validationError.toString());
      }

      expect(parsed.success).toBe(true)
    })
  }
});
