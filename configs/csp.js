const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const site_domain_tld =
    process.env.NEXT_PUBLIC_SITE_DOMAIN_TLD || 'matters.town',
  site_domain_tld_old =
    process.env.NEXT_PUBLIC_SITE_DOMAIN_TLD_OLD || 'matters.news'

// Sentry CSP reporting config
const SENTRY_REPORT_URI = `https://${process.env.NEXT_PUBLIC_SENTRY_DOMAIN}/api/${process.env.NEXT_PUBLIC_SENTRY_PROJECT_ID}/security/?sentry_key=${process.env.NEXT_PUBLIC_SENTRY_PUBLIC_KEY}`
const SENTRY_CSP_REPORT_GROUP = 'csp-endpoint'

// For WalletConnect
// @see https://github.com/WalletConnect/walletconnect-docs/pull/1603/files

const SCRIPT_SRC = [
  "'self'",

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,

  // Google Tag Manager
  "'unsafe-inline'",
  "'unsafe-eval'",
  'www.googletagmanager.com',

  // Turnstile
  'challenges.cloudflare.com',

  // GA
  'www.google-analytics.com',
  'ssl.google-analytics.com',
  '*.google-analytics.com',
  '*.analytics.google.com',

  // Stripe
  'js.stripe.com',
]

const STYLE_SRC = [
  "'self'",

  // style-jsx
  "'unsafe-inline'",

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,

  // WalletConnect
  'fonts.googleapis.com',
]

const IMG_SRC = [
  "'self'",
  'data:',
  'blob:',

  // Asssets
  process.env.NEXT_PUBLIC_EMBED_ASSET_DOMAIN,
  process.env.NEXT_PUBLIC_LEGACY_ASSET_DOMAIN,

  process.env.NEXT_PUBLIC_CF_IMAGE_URL
    ? new URL(process.env.NEXT_PUBLIC_CF_IMAGE_URL).hostname
    : undefined,

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN?.replace(
    site_domain_tld,
    site_domain_tld_old
  ),

  // For image validation
  // @see {@url src/common/utils/form/image.tsx}
  `*.${site_domain_tld}`,
  isProd ? undefined : 'localhost',
  isProd ? undefined : '127.0.0.1',

  // Alchemy NFT CDN
  'nft-cdn.alchemy.com',

  // for some old articles were using this s3 urls directly
  'matters-server-production.s3-ap-southeast-1.amazonaws.com',

  // GA
  'www.google-analytics.com',

  // WalletConnect
  '*.walletconnect.com',
  '*.walletconnect.org',

  // Billboard
  process.env.NEXT_PUBLIC_BILLBOARD_IMAGE_URL,
]

const FONT_SRC = [
  "'self'",

  // WalletConnect
  'fonts.gstatic.com',
]

const MEDIA_SRC = IMG_SRC

const CONNECT_SRC = [
  "'self'",
  'ws:',
  'wss:',

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,

  // API
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_API_URL?.replace(
    site_domain_tld,
    site_domain_tld_old
  ),

  process.env.NEXT_PUBLIC_API_URL?.replace(
    site_domain_tld,
    site_domain_tld_old
  ),

  // Cloudflare Image Upload
  'upload.imagedelivery.net',

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
  'cloudflare-ipfs.com/ipfs/',
  'ipfs.io/ipfs/',
  'ipfs-gateway.matters.town/ipfs/',
  'ipfs.w3s.link',

  // Sentry
  '*.ingest.us.sentry.io',
]

const FRAME_SRC = [
  "'self'",

  // Embed
  'button.like.co',
  'www.youtube.com',
  'player.vimeo.com',
  'player.bilibili.com',
  'www.bilibili.com',
  'www.instagram.com',
  'jsfiddle.net',
  'codepen.io',

  // Turnstile
  'challenges.cloudflare.com',

  // Stripe
  'js.stripe.com',
  'hooks.stripe.com',

  // WalletConnect
  '*.walletconnect.com',
  '*.walletconnect.org',
]

const CSP_POLICY = Object.entries({
  'default-src': ["'self'"],
  'script-src': SCRIPT_SRC,
  'style-src': STYLE_SRC,
  'img-src': IMG_SRC,
  'font-src': FONT_SRC,
  'media-src': MEDIA_SRC,
  'connect-src': CONNECT_SRC,
  'frame-src': FRAME_SRC,
  'report-uri': SENTRY_REPORT_URI,
  'report-to': SENTRY_CSP_REPORT_GROUP,
})
  .map(([k, v]) => {
    const values = Array.isArray(v)
      ? [...new Set(v)]
          .filter(Boolean)
          .map((s) => s?.trim())
          .join(' ')
      : v
    return `${k} ${values.trim()}`
  })
  .join('; ')

module.exports = { CSP_POLICY, SENTRY_REPORT_URI, SENTRY_CSP_REPORT_GROUP }
