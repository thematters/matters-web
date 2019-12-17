#!/bin/bash

apt update
apt install -y build-essential

# chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt install -y ./google-chrome-stable_current_amd64.deb

# firefox
# apt install -y packagekit-gtk3-module
# wget -O FirefoxSetup.tar.bz2 "https://download.mozilla.org/?product=firefox-latest&os=linux64&lang=en-US"
# mkdir /opt/firefox
# tar xjf FirefoxSetup.tar.bz2 -C /opt/firefox/
# ln -s /opt/firefox/firefox/firefox /usr/bin/firefox
