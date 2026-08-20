---
name: frigate
short_desc: A local AI-powered Network Video Recorder for security cameras.
version: stable
---

# Frigate

Frigate is a complete and local Network Video Recorder (NVR) designed for Home Assistant with AI-powered object detection.

Configure your cameras in Frigate after installation. Recordings and snapshots are stored in the app data directory.

## Intel GPU acceleration in a Proxmox LXC

This app passes `/dev/dri/renderD128` through to Frigate for Intel hardware acceleration. On the Proxmox host, add the following lines to `/etc/pve/lxc/<id>.conf` before starting the container:

```text
lxc.cgroup2.devices.allow: c 226:128 rwm
lxc.mount.entry: /dev/dri/renderD128 dev/dri/renderD128 none bind,optional,create=file
features: fuse=1,nesting=1
```

The device must be available inside the LXC before installing or starting Frigate. Privileged containers and world-readable render devices may be required depending on the host permissions and Proxmox setup.
