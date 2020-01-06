#!/bin/bash

apt update
apt install -y build-essential

echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p

# chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt install -y ./google-chrome-stable_current_amd64.deb
