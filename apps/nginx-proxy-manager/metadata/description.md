# Nginx Proxy Manager

Nginx Proxy Manager provides a simple web interface for managing Nginx proxy hosts, redirections, streams, access lists, and SSL certificates.

## Access

Open the administration interface on port `81`. Runtipi keeps host ports `80` and `443` for its own reverse proxy and routes exposed domains to Nginx Proxy Manager's internal HTTP port `80`.

Configure HTTPS certificates and public domain termination in Runtipi. Nginx Proxy Manager can still route requests to internal services and manage proxy hosts behind Runtipi.

## Storage

Application data is stored in `/runtipi/app-data/nginx-proxy-manager/data`, and Let's Encrypt certificates are stored in `/runtipi/app-data/nginx-proxy-manager/letsencrypt`.

## Default Login

The default login is `admin@example.com` with password `changeme`. Change it immediately after the first login.

## Source

https://github.com/NginxProxyManager/nginx-proxy-manager