const SCRIPT_SRC = [
  "'self'",

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

  // Stripe
  'js.stripe.com',
].join(' ')

const STYLE_SRC = [
  "'self'",

  // style-jsx
  "'unsafe-inline'",

  // Programmable Google Search
  'www.google.com/cse/',
].join(' ')

const IMG_SRC = [
  "'self'",

  // Asssets
  'data:',
  process.env.NEXT_PUBLIC_ASSET_DOMAIN,

  // GA
  'www.google-analytics.com',
].join(' ')

const MEDIA_SRC = IMG_SRC

const CONNECT_SRC = [
  "'self'",

  // API
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_OAUTH_API_URL,

  // Sentry
  'sentry.matters.one',

  // GA
  'www.google-analytics.com',

  // Firebase
  'firebase.googleapis.com',
  'firebaseinstallations.googleapis.com',
  'fcmregistrations.googleapis.com',

  // Stripe
  'api.stripe.com',

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
].join(' ')

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
].join(' ')

export const CSP_POLICY = `default-src 'self'; script-src ${SCRIPT_SRC}; style-src ${STYLE_SRC}; img-src ${IMG_SRC}; media-src ${MEDIA_SRC}; frame-src ${FRAME_SRC}; connect-src ${CONNECT_SRC}`
