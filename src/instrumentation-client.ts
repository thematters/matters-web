// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

// import packageJson from '@/package.json'
import { SENTRY_CONFIG } from '../configs/sentry.config'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

// const commonIntegrations = [
//   Sentry.thirdPartyErrorFilterIntegration({
//     // defined in `unstable_sentryWebpackPluginOptions` of next.config.ts
//     filterKeys: [packageJson.name],
//     behaviour: 'drop-error-if-contains-third-party-frames',
//   }),
// ]

Sentry.init({
  ...SENTRY_CONFIG,
  ...(isLocal
    ? {
        // integrations: [...commonIntegrations],
      }
    : {
        integrations: [
          // ...commonIntegrations,
          Sentry.browserTracingIntegration(),
        ],
        tracePropagationTargets: ['localhost', /graphql/],
        tracesSampleRate: 0.1,
      }),
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
