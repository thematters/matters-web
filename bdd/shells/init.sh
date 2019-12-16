#!/bin/bash

echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
cp .env.example .env
npm run build
npm run start &
