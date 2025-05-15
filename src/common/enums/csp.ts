const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
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

  // Turnstile
  'challenges.cloudflare.com',

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

  // Google AdSense
  'pagead2.googlesyndication.com',
  '*.adtrafficquality.google',
  '*.doubleclick.net',
  'tpc.googlesyndication.com',
  'adservice.google.com',
]

const STYLE_SRC = [
  "'self'",

  // Next.js Assets
  process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN,

  // style-jsx
  "'unsafe-inline'",

  // Programmable Google Search
  'www.google.com/cse/',
]

const IMG_SRC = [
  "'self'",

  // Asssets
  'data:',
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
  'blob:',
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

  // Google AdSense
  'pagead2.googlesyndication.com',
  'googleads.g.doubleclick.net',
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
  'cloudflare-ipfs.com/ipfs/',
  'ipfs.io/ipfs/',
  '4everland.io/ipfs/',

  'ipfs-gateway.matters.town/ipfs/',
  'ipfs.w3s.link',

  // Google AdSense
  '*.adtrafficquality.google',
  'adservice.google.com',
  '*.doubleclick.net',
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

  // ReCaptcha
  'www.google.com/recaptcha/',
  'recaptcha.google.com/recaptcha/',

  // Turnstile
  'challenges.cloudflare.com',

  // Stripe
  'js.stripe.com',
  'hooks.stripe.com',

  // WalletConnect
  '*.walletconnect.com',
  '*.walletconnect.org',

  // Google AdSense
  'pagead2.googlesyndication.com',
  'googleads.g.doubleclick.net',
  'tpc.googlesyndication.com',
  '*.adtrafficquality.google',
]

export const CSP_POLICY = Object.entries({
  'script-src': SCRIPT_SRC,
  'style-src': STYLE_SRC,
  'img-src': IMG_SRC,
  'media-src': MEDIA_SRC,
  'connect-src': CONNECT_SRC,
  'frame-src': FRAME_SRC,
  'default-src': ["'self'"],
})
  .map(
    ([k, v]) =>
      `${k} ${(Array.isArray(v)
        ? Array.from(new Set(v))
            .map((s) => s?.trim())
            .filter(Boolean)
            .join(' ')
        : v
      ).trim()}`
  )
  .join('; ')
