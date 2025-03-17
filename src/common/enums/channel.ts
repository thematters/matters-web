const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const TEMPORARY_CHANNEL_URL = isProd
  ? '/e/f7rpyecg32mg'
  : '/e/t9p326zyz027'
