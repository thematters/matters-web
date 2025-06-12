#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Get the git commit ref from environment
const gitCommitRef = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF

console.log(`Building for branch: ${gitCommitRef}`)

// Function to execute commands
function exec(command) {
  console.log(`Executing: ${command}`)
  execSync(command, { stdio: 'inherit' })
}

// Function to append to .env.local
function appendToEnvLocal(key, value) {
  const envLine = `\n${key}=${value}\n`
  fs.appendFileSync('.env.local', envLine)
  console.log(`Added to .env.local: ${key}=${value}`)
}

// Check the branch and configure environment accordingly
if (gitCommitRef && gitCommitRef === 'release/next') {
  // Production release/next branch
  // Deployed to web-next.matters.town
  console.log('Configuring for production (release/next)')
  exec('npm run gen:type:prod')
  exec('cp -va .env.prod .env.local')
  appendToEnvLocal('NEXT_PUBLIC_SITE_DOMAIN', 'web-next.matters.town')
} else if (gitCommitRef && gitCommitRef === 'release/next-beta') {
  // Production release/next-beta branch
  // Deployed to beta-new-home.matters.town
  console.log('Configuring for production (release/next-beta)')
  exec('npm run gen:type:prod')
  exec('cp -va .env.prod .env.local')
  appendToEnvLocal('NEXT_PUBLIC_SITE_DOMAIN', 'beta-new-home.matters.town')
} else if (gitCommitRef && gitCommitRef === 'release/next-dev') {
  // Development release/next-dev branch
  // Deployed to web-next.matters.icu
  console.log('Configuring for next-dev (release/next-dev)')
  exec('npm run gen:type')
  exec('cp -va .env.dev .env.local')
  appendToEnvLocal('NEXT_PUBLIC_SITE_DOMAIN', 'web-next.matters.icu')
} else {
  // Default development configuration
  // Deployed to *.vercel.app preview
  console.log('Configuring for development (default)')
  exec('npm run gen:type')
  exec('cp -va .env.dev .env.local')
  appendToEnvLocal(
    'NEXT_PUBLIC_SITE_DOMAIN',
    process.env.NEXT_PUBLIC_VERCEL_URL
  )
  appendToEnvLocal('NEXT_PUBLIC_VERCEL', 'true')

  // set to reverse proxy
  // https://github.com/thematters/api-reverse-proxy
  appendToEnvLocal(
    'NEXT_PUBLIC_API_URL',
    'https://server-develop-matters.vercel.app/graphql'
  )
}

// Add common environment variables
console.log('Adding common environment variables')
appendToEnvLocal('NEXT_PUBLIC_NEXT_ASSET_DOMAIN', '')
appendToEnvLocal('NEXT_PUBLIC_ADMIN_VIEW', 'true')

// Build the application
console.log('Building the application')
exec('npm run build')

console.log('Build completed successfully!')
