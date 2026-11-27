---
name: Tuliprox
short_desc: IPTV proxy and playlist manager
version: 3.3.0
---

# Tuliprox

Tuliprox combines, filters, and serves IPTV playlists and TV guides to compatible players and media servers such as Jellyfin and Plex. It does not provide channels or credentials; use only sources you are authorized to access.

## Setup

1. Keep the service on a trusted network during first setup. The setup wizard is accessible without authentication until completed.
2. Open the web interface on port 8901 and complete the wizard, including creating a strong administrator account and adding your source and target.
3. Configure the advertised server address in the wizard or API proxy settings to an address your players can reach. The automatically detected address may be an internal Docker address.
4. Configure your player using the output URLs and credentials from Tuliprox.

For remote access, use HTTPS and appropriate network restrictions. Protect provider credentials and playlist URLs; do not expose the setup wizard to the public internet.

Configuration, application data, backups, downloads, and cache are stored in the app data directory. Back up configuration and data regularly. The container runs as UID and GID 1000; if your host filesystem prevents it from writing, check the app data directory permissions. Local media files are not mounted automatically.

See the [installation guide](https://github.com/euzu/tuliprox/blob/v3.3.0/docs/src/installation.md) and [configuration documentation](https://github.com/euzu/tuliprox/blob/v3.3.0/docs/src/getting-started.md).
