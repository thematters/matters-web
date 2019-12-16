#!/bin/bash

cp .env.example .env
npm run build
npm run start &
