const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const CSP_POLICY = isProd
  ? "default-src 'self'; script-src 'self' www.googletagmanager.com; img-src 'self' data: assets.matters.news; media-src 'self' assets.matters.news; frame-src jsfiddle.net button.like.co www.youtube.com player.vimeo.com player.youku.com"
  : "default-src 'self'; script-src 'self' www.googletagmanager.com; img-src 'self' data: assets.matters.news assets-develop.matters.news assets-stage.matters.news; media-src 'self' assets.matters.news assets-develop.matters.news assets-stage.matters.news; frame-src jsfiddle.net button.like.co www.youtube.com player.vimeo.com player.youku.com"
