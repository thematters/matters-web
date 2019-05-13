import getConfig from 'next/config'

const {
  publicRuntimeConfig: { ENV }
} = getConfig()
const isProd = ENV === 'production'

export const POLL_INTERVAL = isProd ? 1000 * 10 : 1000 * 60
