import { excludeGraphQLFetch } from 'apollo-link-sentry'

import packageJson from '@/package.json'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const SENTRY_CONFIG = {
  // enabled: !isLocal && typeof window !== 'undefined',
  dsn: `https://${process.env.NEXT_PUBLIC_SENTRY_PUBLIC_KEY}@${process.env.NEXT_PUBLIC_SENTRY_DOMAIN}/${process.env.NEXT_PUBLIC_SENTRY_PROJECT_ID}`,
  debug: isLocal,
  environment: isProd ? 'production' : 'development',
  release: packageJson.version,
  ignoreErrors: [
    // i18n
    'React Intl',
    // API
    'Timeout',
    'Network',
    'PersistedQueryNotFound',
    'AbortError',
  ],
  sampleRate: isLocal ? 1 : 0.1,
  beforeBreadcrumb: excludeGraphQLFetch,
}
