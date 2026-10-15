# Omada Controller (Host Network)

The TP-Link Omada Software Controller provides centralized configuration, monitoring, and management for compatible Omada access points, switches, and gateways. This variant uses the community-maintained `mbentley/omada-controller` Docker image with host networking for LAN device discovery.

## Network And Ports

Host networking binds the controller ports directly on the Runtipi host; no ports are published or remapped by Docker. The following ports must be available:

| Protocol | Ports |
| --- | --- |
| TCP | 8088, 8043, 8044, 8843, 29811-29817 |
| UDP | 19810, 27001, 29810 |

Open `https://<your-runtipi-host>:8043` to configure the controller. It uses a self-signed certificate by default, so your browser may show a certificate warning. Initial startup can take several minutes. Do not expose the management or discovery ports to the internet.

Do not run this variant at the same time as the bridge-network Omada Controller app; both need the same host ports. Each app keeps data in its own Runtipi app directory. Back up and restore the controller configuration when switching variants.

## Image Updates

This app uses `mbentley/omada-controller:6`.