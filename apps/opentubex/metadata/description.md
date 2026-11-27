---
name: OpenTubeX
short_desc: A privacy-focused YouTube client with a local library.
version: latest
---

# OpenTubeX

OpenTubeX is an open-source YouTube client for browsing videos, following channels, and organizing a local library. This installation includes an Invidious server, its companion, and a PostgreSQL database.

## Access

OpenTubeX requires a secure browser origin for its library. Configure an HTTPS domain or a private HTTPS reverse proxy and open that URL; plain HTTP works only on `localhost`. The app has no server-side access control, so protect any remotely accessible URL with authentication or a firewall.

The Invidious services may need about a minute to start before videos play. Search and playback can still be affected by YouTube blocking the server's IP.

## Library and privacy

Subscriptions, history, and playlists are stored in each browser, not in the server database. Export your library regularly or configure [sync](https://opentubex.org/docs/sync/) to share selected data between devices. The OpenTubeX public sync server is the default when sync is enabled; a self-hosted server is optional and is not included.

The bundled Invidious instance contacts YouTube from your server. To use the Local API instead, install the [browser extension](https://github.com/OpenTubeX/OpenTubeX/tree/development/browser-extension) in each browser and configure it for your HTTPS address.

The PostgreSQL data is persistent. The companion's cache is temporary and is recreated when its container is replaced. Keep the generated Invidious and database keys unchanged across updates.

The companion key was regenerated in app version 2 to meet Invidious's 16-character requirement. The database password is unchanged.

See the [self-hosting guide](https://opentubex.org/docs/self-hosting/) for setup, provider choices, and troubleshooting.
