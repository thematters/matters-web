#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')

// Get the git commit ref from environment
const gitCommitRef = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF

console.log(`Building for branch: ${gitCommitRef}`)

// Function to execute commands
function exec(command) {
  console.log(`Executing: ${command}`)
  execSync(command, { stdio: 'inherit' })
}

// Function to remove existing env variable from .env.local
function removeFromEnvLocal(key) {
  if (!fs.existsSync('.env.local')) return

  const envContent = fs.readFileSync('.env.local', 'utf8')
  const lines = envContent.split('\n')
  const filteredLines = lines.filter((line) => !line.startsWith(`${key}=`))

  fs.writeFileSync('.env.local', filteredLines.join('\n'))
  console.log(`Removed ${key} from .env.local`)
}

// Function to append to .env.local
function appendToEnvLocal(key, value) {
  const envLine = `\n${key}=${value}\n`
  fs.appendFileSync('.env.local', envLine)
  console.log(`Added to .env.local: ${key}=${value}`)
}

// Function to set env variable (remove first, then append)
function setEnvLocal(key, value) {
  removeFromEnvLocal(key)
  appendToEnvLocal(key, value)
}

// Check the branch and configure environment accordingly
if (gitCommitRef && gitCommitRef === 'release/next-beta') {
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
  setEnvLocal('NEXT_PUBLIC_SITE_DOMAIN', 'web-next.matters.icu')
} else {
  // Default development configuration
  // Deployed to *.vercel.app preview
  console.log('Configuring for development (default)')
  exec('npm run gen:type')
  exec('cp -va .env.dev .env.local')
  setEnvLocal('NEXT_PUBLIC_SITE_DOMAIN', process.env.NEXT_PUBLIC_VERCEL_URL)
  setEnvLocal('NEXT_PUBLIC_VERCEL', 'true')

  // set to reverse proxy
  // https://github.com/thematters/api-reverse-proxy
  setEnvLocal(
    'NEXT_PUBLIC_API_URL',
    'https://server-develop-matters.vercel.app/graphql'
  )
}

// Add common environment variables
setEnvLocal('NEXT_PUBLIC_NEXT_ASSET_DOMAIN', '')
setEnvLocal('NEXT_PUBLIC_ADMIN_VIEW', 'true')

// Build the application
console.log('Building the application')
exec('npm run build')

console.log('Build completed successfully!')
