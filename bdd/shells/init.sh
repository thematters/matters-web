#!/bin/bash

apt update
apt install -y build-essential

# chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt install -y ./google-chrome-stable_current_amd64.deb

# firefox
apt install -y firefox-esr
