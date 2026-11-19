---
name: HolyArrs
short_desc: Manage media requests, downloads, and libraries in one app.
version: 1.2.0
---

# HolyArrs

HolyArrs brings movie, TV, and music requests, release management, subtitles, and library organization together in one self-hosted app. It connects to your existing download clients and media servers; it does not download media by itself.

## First start

Open HolyArrs at `http://<your-runtipi-host>:6262` and create the owner account. There is no default password; the first person to open the setup page becomes the owner.

## Media and download folders

The host directory `/share/Download` is mounted at the same path inside HolyArrs. In the setup wizard, use folders under this path, for example `/share/Download/Movies` and `/share/Download/Shows`. Mount this same host directory at the same container path in your downloader so HolyArrs can import files without copying them.

HolyArrs keeps its settings, database, and encryption key in the persistent `/config` directory. Back up `holyarrs.key` separately using HolyArrs' **Settings > Backups > Download key kit** flow; backups do not include the key.

Do not expose port `6262` directly to the internet. Use a VPN or a reverse proxy with HTTPS for remote access.

For more setup and troubleshooting details, see the [upstream documentation](https://docs.holyarrs.com/).
