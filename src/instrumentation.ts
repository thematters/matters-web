import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../configs/sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../configs/sentry.edge.config')
  }
}

export const onRequestError = Sentry.captureRequestError
