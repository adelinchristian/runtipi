---
name: Reostream
short_desc: Reliable RTSP and HTTP streams from Reolink cameras.
version: 0.2.9
---

# Reostream

Reostream connects to Reolink cameras over their Baichuan protocol and serves their video as RTSP and HTTP MPEG-TS. Use it as a camera source for Frigate, go2rtc, or another NVR; it does not replace your NVR.

## First start

Open the Reostream page at `http://<your-runtipi-host>:8562`. On first startup, get the one-time claim token from the container logs and enter it on the page. Save the generated password; it is needed to access the control page later.

## Networking

This app uses host networking so it can discover cameras on your LAN and receive camera-uploaded clips. The following ports must be available on the Runtipi host:

| Port | Protocol | Purpose |
| --- | --- | --- |
| 8560 | TCP | HTTP streams and status API |
| 8561 | TCP | RTSP streams |
| 8562 | TCP | Setup and control page |
| 2121-2131 | TCP | FTP receiver for camera-uploaded clips |

Add Reostream's stream URLs to your NVR, for example `rtsp://<your-runtipi-host>:8561/<camera>` or `http://<your-runtipi-host>:8560/<camera>.ts`. The Reolink camera's TCP port `9000` must be reachable from the Runtipi host. If camera discovery does not find a camera, add it by address in Reostream.

Keep the control page and stream ports on your trusted LAN. Reostream's streams are open by default; configure RTSP credentials in Reostream if stream authentication is needed.

For detailed configuration and troubleshooting, see the [upstream setup guide](https://github.com/VoltTech21/reostream/blob/main/docs/setup.md).
