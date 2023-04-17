const site_domain_tld =
    process.env.NEXT_PUBLIC_SITE_DOMAIN_TLD || 'matters.town',
  site_domain_tld_old =
    process.env.NEXT_PUBLIC_SITE_DOMAIN_TLD_OLD || 'matters.news'

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

  // AdSense
  'pagead2.googlesyndication.com',

  // Stripe
  'js.stripe.com',
]

const STYLE_SRC = [
  "'self'",

  // style-jsx
  "'unsafe-inline'",

  // Programmable Google Search
  'www.google.com/cse/',
]

const IMG_SRC = [
  "'self'",

  // Asssets
  'data:',
  process.env.NEXT_PUBLIC_LEGACY_PRE_ASSET_DOMAIN,
  process.env.NEXT_PUBLIC_LEGACY_ASSET_DOMAIN,
  process.env.NEXT_PUBLIC_LEGACY_ASSET_DOMAIN?.replace(
    site_domain_tld,
    site_domain_tld_old
  ),

  process.env.NEXT_PUBLIC_ASSET_DOMAIN
    ? new URL(process.env.NEXT_PUBLIC_ASSET_DOMAIN).hostname
    : undefined,

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN?.replace(
    site_domain_tld,
    site_domain_tld_old
  ),

  // get server hostname, for img-cache redirected url
  // NEXT_PUBLIC_API_HOSTNAME as string,
  process.env.NEXT_PUBLIC_API_URL
    ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname
    : undefined,

  // for some old articles were using this s3 urls directly
  'matters-server-production.s3-ap-southeast-1.amazonaws.com',

  // GA
  'www.google-analytics.com',
]

const MEDIA_SRC = IMG_SRC

const CONNECT_SRC = [
  "'self'",
  'ws:',
  'wss:',

  // API
  process.env.NEXT_PUBLIC_API_URL,

  process.env.NEXT_PUBLIC_API_URL?.replace(
    site_domain_tld,
    site_domain_tld_old
  ),

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
  'ipfs.infura.io/ipfs/',
  'dweb.link/ipfs/',
  'crustwebsites.net/ipfs/',
  'cloudflare-ipfs.com/ipfs/',
  'ipfs.fleek.co/ipfs/',
  'gateway.pinata.cloud/ipfs/',
  'meson.network/ipfs/',
  'ipfs.filebase.io/ipfs/',
]

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
]

const PREFETCH_SRC = [
  "'self'",

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,
]

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
