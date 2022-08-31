import NextHead from 'next/head'
import { useContext } from 'react'

import { LanguageContext, useRoute } from '~/components'

import { langConvert, translate, TranslateArgs } from '~/common/utils'

import IMAGE_APPLE_TOUCH_ICON from '@/public/static/apple-touch-icon.png'
import IMAGE_FAVICON_16 from '@/public/static/favicon-16x16.png'
import IMAGE_FAVICON_32 from '@/public/static/favicon-32x32.png'
import IMAGE_FAVICON_64 from '@/public/static/favicon-64x64.png'
import IMAGE_INTRO from '@/public/static/images/intro.jpg'

const siteDomain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_CANONICAL || // for web-next, set this different as serving domain; suggested canonical domain ('matters.news') to robots
  process.env.NEXT_PUBLIC_SITE_DOMAIN ||
  'matters.news'
const isProdServingCanonical =
  process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production' &&
  process.env.NEXT_PUBLIC_SITE_DOMAIN === 'matters.news' // is serving domain same as canonical domain?

interface HeadProps {
  title?: string | TranslateArgs
  description?: string | null
  keywords?: string[]
  path?: string
  image?: string | null
  noSuffix?: boolean
  paymentPointer?: string
  jsonLdData?: object | null
}

export const Head: React.FC<HeadProps> = (props) => {
  const { router } = useRoute()
  const { lang } = useContext(LanguageContext)
  const title =
    typeof props.title === 'object'
      ? translate({ ...props.title, lang })
      : props.title

  const head = {
    title: title ? (props.noSuffix ? title : `${title} - Matters`) : 'Matters',
    description:
      props.description ||
      'Matters 致力搭建去中心化的寫作社群與內容生態。基於 IPFS 技術，令創作不受制於任何平台，獨立性得到保障；引入加密貨幣，以收入的形式回饋給作者；代碼開源，建立創作者自治社區。',
    keywords: props.keywords
      ? `${props.keywords.join(',')},matters,matters.news,創作有價`
      : 'matters,matters.news,創作有價',
    url: props.path
      ? `https://${siteDomain}${props.path}`
      : `https://${siteDomain}${router.asPath || '/'}`,
    image: props.image || IMAGE_INTRO.src,
  }
  const canonicalUrl = head.url?.split('#')[0].split('?')[0]

  return (
    <NextHead>
      <meta charSet="utf-8" key="charSet" />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, viewport-fit=cover"
      />
      <title>{head.title}</title>
      <meta name="description" key="description" content={head.description} />
      <meta name="keywords" key="keywords" content={head.keywords} />
      <link
        rel="icon"
        type="image/png"
        href={IMAGE_FAVICON_16.src}
        sizes="16x16"
        key="favicon-16"
      />
      <link
        rel="icon"
        type="image/png"
        href={IMAGE_FAVICON_32.src}
        sizes="32x32"
        key="favicon-32"
      />
      <link
        rel="icon"
        type="image/png"
        href={IMAGE_FAVICON_64.src}
        sizes="64x64"
        key="favicon-64"
      />
      <link
        rel="search"
        title="Matters"
        href="/static/opensearch.xml"
        type="application/opensearchdescription+xml"
        key="opensearch"
      />
      <link rel="canonical" href={canonicalUrl} key="canonical" />
      {props.paymentPointer && (
        <meta name="monetization" content={props.paymentPointer} />
      )}

      {/* noindex for non-production enviroment */}
      {!isProdServingCanonical && (
        <meta name="robots" content="noindex, nofollow" key="robots" />
      )}
      {!isProdServingCanonical && (
        <meta name="googlebot" content="noindex, nofollow" key="googlebot" />
      )}

      {/* social */}
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
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
      <meta
        name="twitter:card"
        key="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:title" key="twitter:title" content={head.title} />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={head.description}
      />
      <meta name="twitter:image" key="twitter:image" content={head.image} />

      {/* PWA */}
      <link
        rel="apple-touch-icon"
        key="apple-touch-icon"
        href={IMAGE_APPLE_TOUCH_ICON.src}
      />
      <meta name="application-name" key="application-name" content="Matters" />
      <meta name="theme-color" key="theme-color" content="#fff" />
      <meta
        name="apple-mobile-web-app-title"
        key="apple-mobile-web-app-title"
        content="Matters"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        key="apple-mobile-web-app-status-bar-style"
        content="default"
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

      <link rel="manifest" key="manifest" href="/static/manifest.json" />

      {/* DNS */}
      <link rel="dns-prefetch" href="https://www.gstatic.com" />
      <link rel="dns-prefetch" href="https://sentry.matters.one" />

      {props.jsonLdData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitize(JSON.stringify(props.jsonLdData)),
          }}
          key="ld-json-data"
        />
      )}
    </NextHead>
  )
}

// https://redux.js.org/usage/server-rendering/#security-considerations
// from https://github.com/yahoo/serialize-javascript/blob/main/index.js#L19-L31
// except the '/'
const ESCAPED_CHARS: Record<string, string> = {
  '<': '\\u003C',
  '>': '\\u003E',
  // '/'     : '\\u002F',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
}

function sanitize(str: string): string {
  return str.replace(
    /[<>\u2028\u2029]/g,
    (unsafeChar) => ESCAPED_CHARS[unsafeChar] || ''
  )
}
