# 9Drive

9Drive is a storage gateway web app for connecting multiple Google Drive accounts into one virtual storage dashboard. It supports Google Drive and S3-compatible storage, uploads, virtual folders, file previews, sharing, and quota tracking.

## Configuration

Configure Google OAuth values in the app settings if Google sign-in or Drive connections are needed. Use strong, unique values for the JWT access secret and token encryption key.

## Storage

The MySQL database is stored in `/runtipi/app-data/9drive/data/mysql`.

## Source

https://github.com/zenhosta/9drive