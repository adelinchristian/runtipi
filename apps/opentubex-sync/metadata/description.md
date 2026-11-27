---
name: OpenTubeX Sync Server
short_desc: Sync OpenTubeX data across devices
version: latest-sqlite
---

# OpenTubeX Sync Server

Sync subscriptions, playlists, history, profiles, and settings between OpenTubeX devices. Current OpenTubeX clients encrypt synced data with a separate privacy passphrase before uploading it.

## Setup

1. Expose the service through HTTPS using Runtipi or a trusted reverse proxy. The default host port is 8081; the service uses port 8080 internally.
2. In each OpenTubeX app, open **Settings > Sync**, enable sync, and enter the server's HTTPS URL.
3. Register an account and choose a separate privacy passphrase. Pair or sign in on your other devices. Back up the privacy passphrase separately; the server cannot recover it.
4. Optionally disable registration in the Runtipi app settings after creating your accounts.

The server has no graphical interface. Its API documentation is available at `/docs`. It uses its own account authentication; a separate proxy login can prevent OpenTubeX clients from connecting.

Runtipi exposes the service port when **Open Port** is enabled. Plain HTTP exposes account passwords and session tokens; HTTPS is also required for QR-code pairing. If exposing the server publicly, restrict access appropriately and use HTTPS.

## Data and updates

The SQLite database is stored in the app's persistent data directory. Back up the database and generated sync server secret together, and keep the secret unchanged: changing it makes existing accounts unreachable. Export OpenTubeX libraries separately as an additional backup.

The image follows `latest-sqlite`. Updates can require database migrations. If the server reports pending migrations, back up and verify the database first, then enter the exact comma-separated versions from the logs in **Database migration approval** and restart. Clear that field after migration so later migrations are not approved automatically.

Runtipi prepares the bundled data directory before starting the non-root container. The upstream image runs as UID and GID 10001; if the host filesystem prevents it from writing, check the directory permissions.

See the [upstream self-hosting guide](https://github.com/OpenTubeX/sync-server#self-hosting) and [sync instructions](https://opentubex.org/docs/sync/).
