import getConfig from 'next/config'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { LanguageContext } from '~/components'

import { langConvert, translate } from '~/common/utils'
import FAVICON_16 from '~/static/favicon-16x16.png?url'
import FAVICON_32 from '~/static/favicon-32x32.png?url'
import ICON_192 from '~/static/icon-192x192.png?url'
import IMAGE_INTRO from '~/static/images/intro.jpg'
import OPENSEARCH from '~/static/opensearch.xml'

const {
  publicRuntimeConfig: { ENV, SITE_DOMAIN, FB_APP_ID }
} = getConfig()
const isProd = ENV === 'production'

interface HeadProps {
  title?: string | { zh_hant: string; zh_hans?: string; en?: string }
  description?: string
  keywords?: string[]
  path?: string
  image?: string
}

const BaseHead: React.FC<HeadProps> = props => {
  const router = useRouter()
  const { lang } = useContext(LanguageContext)
  const title =
    typeof props.title === 'object'
      ? translate({ ...props.title, lang })
      : props.title

  const head = {
    title: title ? `${title} - Matters` : 'Matters',
    description:
      props.description || '一個自由、自主、永續的創作與公共討論空間',
    keywords: props.keywords
      ? `${props.keywords.join(',')},matters,matters.news,創作有價`
      : 'matters,matters.news,創作有價',
    url: props.path
      ? `${SITE_DOMAIN}${props.path}`
      : router.asPath
      ? `${SITE_DOMAIN}${router.asPath}`
      : SITE_DOMAIN,
    image: props.image || IMAGE_INTRO
  }
  const canonicalUrl = head.url.split('#')[0].split('?')[0]

  return (
    <NextHead>
      <meta charSet="utf-8" key="charSet" />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <title>{head.title}</title>
      <meta name="description" key="description" content={head.description} />
      <meta name="keywords" key="keywords" content={head.keywords} />
      <link
        rel="icon"
        type="image/png"
        href={FAVICON_32}
        sizes="32x32"
        key="favicon-32"
      />
      <link
        rel="icon"
        type="image/png"
        href={FAVICON_16}
        sizes="16x16"
        key="favicon-16"
      />
      <link
        rel="search"
        title="Matters"
        href={OPENSEARCH}
        type="application/opensearchdescription+xml"
        key="opensearch"
      />
      <link rel="canonical" href={canonicalUrl} key="canonical" />

      {/* noindex for non-production enviroment */}
      {!isProd && (
        <meta name="robots" content="noindex, nofollow" key="robots" />
      )}
      {!isProd && (
        <meta name="googlebot" content="noindex, nofollow" key="googlebot" />
      )}

      {/* social */}
      <meta property="fb:app_id" content={FB_APP_ID} />
      <meta name="og:title" key="og:title" content={head.title} />
      <meta property="og:site_name" key="og:site_name" content="Matters" />
      <meta property="og:url" key="og:url" content={head.url} />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:image" key="og:image" content={head.image} />
      <meta
        property="og:description"
        key="og:description"
        content={head.description}
      />
      <meta
        property="og:locale"
        key="og:locale"
        content={langConvert.sys2Og(lang)}
      />
      <meta
        property="og:locale:alternate"
        key="og:locale:zh_HK"
        content="zh_HK"
      />
      <meta
        property="og:locale:alternate"
        key="og:locale:zh_TW"
        content="zh_TW"
      />
      <meta
        property="og:locale:alternate"
        key="og:locale:zh_CN"
        content="zh_CN"
      />
      <meta name="twitter:url" key="twitter:url" content={head.url} />
      <meta name="twitter:card" key="twitter:card" content="summary" />
      <meta name="twitter:title" key="twitter:title" content={head.title} />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={head.description}
      />
      <meta name="twitter:image" key="twitter:image" content={head.image} />

      {/* PWA */}
      <link rel="apple-touch-icon" key="apple-touch-icon" href={ICON_192} />
      <meta name="application-name" key="application-name" content="Matters" />
      <meta name="theme-color" key="theme-color" content="#0d6763" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        key="apple-mobile-web-app-status-bar-style"
        content="default"
      />
      <meta
        name="apple-mobile-web-app-title"
        key="apple-mobile-web-app-title"
        content="Matters"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        key="apple-mobile-web-app-status-bar-style"
        content="white"
      />
      <meta
        name="apple-mobile-web-app-capable"
        key="apple-mobile-web-app-capable"
        content="yes"
      />
      <meta
        name="mobile-web-app-capable"
        key="mobile-web-app-capable"
        content="yes"
      />

      <link
        rel="apple-touch-startup-image"
        key="apple-touch-startup-image-640x1136"
        href="/static/splashscreens/launch-640x1136.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        key="apple-touch-startup-image-750x1294"
        href="/static/splashscreens/launch-750x1294.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        key="apple-touch-startup-image-1242x2148"
        href="/static/splashscreens/launch-1242x2148.png"
        media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        key="apple-touch-startup-image-1125x2436"
        href="/static/splashscreens/launch-1125x2436.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        key="apple-touch-startup-image-1536x2048"
        href="/static/splashscreens/launch-1536x2048.png"
        media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        key="apple-touch-startup-image-1668x2224"
        href="/static/splashscreens/launch-1668x2224.png"
        media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />
      <link
        rel="apple-touch-startup-image"
        key="apple-touch-startup-image-2048x2732"
        href="/static/splashscreens/launch-2048x2732.png"
        media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
      />

      <link rel="manifest" key="manifest" href="/static/manifest.json" />
    </NextHead>
  )
}

export const Head = BaseHead
