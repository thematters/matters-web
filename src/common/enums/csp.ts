const SCRIPT_SRC = [
  "'self'",

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,

  // Google Tag Manager
  "'unsafe-inline'",
  "'unsafe-eval'",
  'www.googletagmanager.com',

  // ReCaptcha
  'www.google.com/recaptcha/',
  'www.gstatic.com/recaptcha/',

  // Programmable Google Search
  'cse.google.com',
  'www.google.com/cse/',

  // GA
  'www.google-analytics.com',
  'ssl.google-analytics.com',
  '*.google-analytics.com',
  '*.analytics.google.com',

  // Stripe
  'js.stripe.com',
] // .join(' ')

const STYLE_SRC = [
  "'self'",

  // style-jsx
  "'unsafe-inline'",

  // Programmable Google Search
  'www.google.com/cse/',
] // .join(' ')

/* const { hostname: NEXT_PUBLIC_API_HOSTNAME } = new URL(
  process.env.NEXT_PUBLIC_API_URL as string
) */

const IMG_SRC = [
  "'self'",

  // Asssets
  'data:',
  process.env.NEXT_PUBLIC_ASSET_DOMAIN,

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,

  // 'server-develop.matters.news',
  // NEXT_PUBLIC_API_HOSTNAME as string,
  process.env.NEXT_PUBLIC_API_URL
    ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname
    : undefined,

  // for some old articles were using this s3 urls directly
  'matters-server-production.s3-ap-southeast-1.amazonaws.com',

  // GA
  'www.google-analytics.com',
] // .join(' ')

const MEDIA_SRC = IMG_SRC

const CONNECT_SRC = [
  "'self'",
  'ws:',
  'wss:',

  // API
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_OAUTH_API_URL,

  // Sentry
  '*.ingest.sentry.io',

  // GA
  'www.google-analytics.com',

  // Firebase
  'firebase.googleapis.com',
  'firebaseinstallations.googleapis.com',
  'fcmregistrations.googleapis.com',

  // Stripe
  'api.stripe.com',

  // WalletConnect
  '*.walletconnect.org',
  '*.walletconnect.com',

  // Alchemy
  '*.alchemyapi.io',
  '*.alchemy.com',

  // IPFS Gateways
  'ipfs.io/ipfs/',
  'gateway.ipfs.io/ipfs/',
  'ipfs.infura.io/ipfs/',
  'ninetailed.ninja/ipfs/',
  '10.via0.com/ipfs/',
  'ipfs.eternum.io/ipfs/',
  'hardbin.com/ipfs/',
  'cloudflare-ipfs.com/ipfs/',
  'ipns.co/',
  'gateway.pinata.cloud/ipfs/',
  'ipfs.sloppyta.co/ipfs/',
  'jorropo.ovh/ipfs/',
  'gateway.temporal.cloud/ipfs/',
  'ipfs.privacytools.io/ipfs/',
  'ipfs.jeroendeneef.com/ipfs/',
  'permaweb.io/ipfs/',
  'ipfs.stibarc.com/ipfs/',
  'ipfs.best-practice.se/ipfs/',
  'ipfs.2read.net/ipfs/',
] // .join(' ')

const FRAME_SRC = [
  "'self'",

  // Embed
  'jsfiddle.net',
  'button.like.co',
  'www.youtube.com',
  'player.vimeo.com',
  'player.youku.com',

  // ReCaptcha
  'www.google.com/recaptcha/',
  'recaptcha.google.com/recaptcha/',

  // Stripe
  'js.stripe.com',
  'hooks.stripe.com',
] // .join(' ')

const PREFETCH_SRC = [
  "'self'",

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,
] // .join(' ')

export const CSP_POLICY = Object.entries({
  'script-src': SCRIPT_SRC,
  'style-src': STYLE_SRC,
  'img-src': IMG_SRC,
  'media-src': MEDIA_SRC,
  'connect-src': CONNECT_SRC,
  'frame-src': FRAME_SRC,
  'prefetch-src': PREFETCH_SRC,
  'default-src': ["'self'"],
})
  .map(
    ([k, v]) =>
      `${k} ${(Array.isArray(v)
        ? v
            .map((s) => s?.trim())
            .filter(Boolean)
            .join(' ')
        : v
      ).trim()}`
  )
  .join('; ')
