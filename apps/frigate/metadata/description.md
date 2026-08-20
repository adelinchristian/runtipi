---
name: frigate
short_desc: A local AI-powered Network Video Recorder for security cameras.
version: stable
---

# Frigate

Frigate is a complete and local Network Video Recorder (NVR) designed for Home Assistant with AI-powered object detection.

Configure your cameras in Frigate after installation. Recordings and snapshots are stored in the app data directory.

## Accessing Frigate

Frigate's main web interface on port `8971` uses HTTPS. Open the app through the Runtipi HTTPS URL, or directly at:

```text
https://<runtipi-host>:<APP_PORT>
```

Your browser may show a certificate warning when using the direct URL because Frigate uses a self-signed certificate by default. Do not change the app to HTTP while the service is listening on port `8971`.

RTSP restreaming uses port `8554`. WebRTC uses ports `8555/tcp` and `8555/udp`.

## Troubleshooting

Check that the Frigate container is running and that its HTTPS endpoint responds:

```bash
docker ps --filter name=frigate
docker logs --tail 100 $(docker ps -q --filter name=frigate)
curl -kI https://127.0.0.1:8971
```

If Runtipi reports `502 Bad Gateway`, `connection refused`, or `plain HTTP request was sent to HTTPS port`, verify that:

- the app metadata has `"https": true`;
- the proxy targets Frigate's port `8971` using HTTPS;
- the Frigate container is healthy and listening on `8971`.


## Intel GPU acceleration in a Proxmox LXC

This app passes `/dev/dri/renderD128` through to Frigate for Intel hardware acceleration. For a privileged Proxmox LXC, add the following lines to `/etc/pve/lxc/<id>.conf` before starting the container:

```text
lxc.cgroup2.devices.allow: c 226:* rwm
lxc.mount.entry: /dev/dri dev/dri none bind,optional,create=dir
features: mount=cifs,nesting=1,keyctl=1,fuse=1
```

Verify the device and features from the Proxmox host, replacing `201` with the Runtipi LXC ID:

```bash
pct config 201 | grep -E '^features:|226:|/dev/dri'
pct exec 201 -- ls -l /dev/dri
```

The output should include `nesting=1`, `fuse=1`, and `renderD128`. A privileged container and world-readable render devices may be required depending on the host permissions and Proxmox setup. Restart containers with `pct reboot <id>`; this Proxmox version does not support `pct restart`.
