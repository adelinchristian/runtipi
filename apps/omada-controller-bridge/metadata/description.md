# Omada Controller

The TP-Link Omada Software Controller provides centralized configuration, monitoring, and management for compatible Omada access points, switches, and gateways. This app uses the community-maintained `mbentley/omada-controller` Docker image.

## First Setup

Open `https://<your-runtipi-host>:8043` and follow the controller setup wizard. The controller uses a self-signed certificate by default, so your browser may show a certificate warning. Initial startup can take several minutes.

The app uses Runtipi's configured timezone and publishes these ports on the host:

| Protocol | Ports |
| --- | --- |
| TCP | 8088, 8043, 8044, 8843, 29811-29817 |
| UDP | 19810, 27001, 29810 |

These ports must be available before installation. Stop any existing Omada Controller container to avoid conflicts. Keep the controller accessible only to trusted networks; do not forward its management or discovery ports to the internet.

This app uses bridge networking, matching the supplied Compose configuration. If devices do not discover or adopt the controller, configure their controller/inform address to the Runtipi host's LAN IP using the [upstream device adoption guide](https://github.com/mbentley/docker-omada-controller/blob/master/DEVICE_ADOPTION.md). Allow the required ports through any firewall between the devices and controller.

For host networking, install **Omada Controller (Host Network)** instead. Do not run both variants at the same time because they use the same host ports.

## Persistent Storage And Migration

Controller data is stored in `${APP_DATA_DIR}/data`, and logs in `${APP_DATA_DIR}/logs`. A 60-second shutdown grace period allows the controller and its embedded database to stop cleanly.

Installing this app does not automatically import existing `omada-data` or `omada-logs` Docker volumes. To migrate an existing controller, create a backup in its web interface, stop the old controller, and restore the backup into a compatible version during setup.

## Image Updates

This app uses `mbentley/omada-controller:6`.