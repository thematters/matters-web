import NextHead from 'next/head'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'
import { useContext } from 'react'

import IMAGE_APPLE_TOUCH_ICON from '@/public/static/apple-touch-icon.png'
import IMAGE_FAVICON_32 from '@/public/static/favicon-32x32.png'
import IMAGE_FAVICON_64 from '@/public/static/favicon-64x64.png'
import IMAGE_FAVICON_128 from '@/public/static/favicon-128x128.png'
import { toLocale, toOGLanguage } from '~/common/utils'
import { LanguageContext, useRoute } from '~/components'
import { UserLanguage } from '~/gql/graphql'

interface HeadProps {
  title?: string | null
  description?: string | null
  keywords?: string[]
  path?: string
  image?: string | null
  noSuffix?: boolean
  jsonLdData?: Record<string, unknown> | null
  availableLanguages?: UserLanguage[]
  noindex?: boolean
}

// @see NextSeoProps[languageAlternatives], tho this is readonly so making it mutable
// is kind of a hassle (doable but a bit much)
type LocalAlternativeLang = {
  hrefLang: string
  href: string
}

export const Head: React.FC<HeadProps> = (props) => {
  const { router } = useRoute()
  const { lang } = useContext(LanguageContext)
  const title = props.title

  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || ''
  const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

  // seo base metadata
  const seoTitle = title
    ? props.noSuffix
      ? title
      : `${title} - Matters`
    : 'Matters'
  const seoDescription =
    props.description === null || props.description === ''
      ? undefined
      : props.description ||
        'Matters 致力搭建去中心化的寫作社群與內容生態。基於 IPFS 技術，令創作不受制於任何平台，獨立性得到保障；引入加密貨幣，以收入的形式回饋給作者；代碼開源，建立創作者自治社區。'
  const url = props.path
    ? `https://${siteDomain}${props.path}`
    : `https://${siteDomain}${router.asPath || '/'}`

  const noindex =
    props.noindex ||
    !isProd ||
    siteDomain.includes('web-next') ||
    siteDomain.includes('vercel.app')

  const i18nUrl = (language: string) => {
    return props.path
      ? `https://${siteDomain}/${props.path}?locale=${language}`
      : `https://${siteDomain}/${router.asPath || '/'}?locale=${language}`
  }

  const getLocalLang = (props: HeadProps): LocalAlternativeLang[] => {
    if (props.availableLanguages) {
      const alternativeLanguages: LocalAlternativeLang[] = []
      for (const lang of props.availableLanguages) {
        // we only want these 3 languages so far
        if (
          lang === UserLanguage.En ||
          lang === UserLanguage.ZhHans ||
          lang === UserLanguage.ZhHant
        ) {
          alternativeLanguages.push({
            href: i18nUrl(lang),
            hrefLang: toLocale(lang),
          })
        }
      }
      return alternativeLanguages
    }
    return []
  }

  // next-seo config
  const seoConfig: NextSeoProps = {
    title: seoTitle,
    description: seoDescription,
    canonical: url?.split('#')[0].split('?')[0],
    noindex,
    nofollow: noindex,
    facebook: { appId: process.env.NEXT_PUBLIC_FB_APP_ID || '' },
    themeColor: '#fff',
    // twitter uses og:* for twitter:* unless otherwise specified by next-seo docs
    openGraph: {
      title: seoTitle,
      siteName: 'Matters',
      url,
      type: 'website',
      description: seoDescription,
      locale: toOGLanguage(lang),
      ...(props.image ? { images: [{ url: props.image }] } : {}),
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    // localization
    languageAlternates: [
      ...getLocalLang(props),
      {
        hrefLang: 'x-default',
        href: url,
      },
    ],
    // non-conventional tags for next-seo
    additionalMetaTags: [
      {
        name: 'keywords',
        content: props.keywords
          ? `${props.keywords.join(',')},matters,創作有價`
          : `matters,創作有價`,
      },
      {
        name: 'viewport',
        content:
          'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
      },
      {
        name: 'application-name',
        content: 'Matters',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Matters',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
    additionalLinkTags: [
      {
        rel: 'icon',
        href: IMAGE_FAVICON_32.src,
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'icon',
        href: IMAGE_FAVICON_64.src,
        sizes: '64x64',
        type: 'image/png',
      },
      {
        // Note: With the attribute key, dapp can't get the shortcut icon.
        // key: "favicon-128"
        rel: 'shortcut icon',
        href: IMAGE_FAVICON_128.src,
        sizes: '128x128',
        type: 'image/png',
      },
      {
        rel: 'apple-touch-icon',
        href: IMAGE_APPLE_TOUCH_ICON.src,
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }

  if (props.jsonLdData && !props.jsonLdData.description) {
    props.jsonLdData.description = seoConfig.description
  }

  return (
    <>
      <NextSeo {...seoConfig} />
      {/** for the ones that next-seo does not support, we still need to add them with next/head, see: https://github.com/garmeeh/next-seo/issues/265#issuecomment-610216521 */}
      <NextHead>
        <meta charSet="utf-8" key="charSet" />
        <link
          rel="search"
          title="Matters"
          href="/opensearch.xml"
          type="application/opensearchdescription+xml"
          key="opensearch"
        />
        {props.jsonLdData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: sanitize(JSON.stringify(props.jsonLdData)),
            }}
            key="ld-json-data"
          />
        )}

        {/* noindex for non-production enviroment */}
        {noindex && (
          <meta name="robots" content="noindex, nofollow" key="robots" />
        )}
        {noindex && (
          <meta name="googlebot" content="noindex, nofollow" key="googlebot" />
        )}

        {process.env.NEXT_PUBLIC_CF_IMAGE_URL && (
          <>
            <link
              rel="preconnect"
              href={new URL(process.env.NEXT_PUBLIC_CF_IMAGE_URL).origin}
              key="preconnect-cf-image"
            />
            <link
              rel="dns-prefetch"
              href={new URL(process.env.NEXT_PUBLIC_CF_IMAGE_URL).origin}
              key="dns-prefetch-cf-image"
            />
          </>
        )}

        {process.env.NEXT_PUBLIC_EMBED_ASSET_DOMAIN && (
          <>
            <link
              rel="preconnect"
              href={`https://${process.env.NEXT_PUBLIC_EMBED_ASSET_DOMAIN}`}
              key="preconnect-embed-asset-domain"
            />
            <link
              rel="dns-prefetch"
              href={`https://${process.env.NEXT_PUBLIC_EMBED_ASSET_DOMAIN}`}
              key="dns-prefetch-embed-asset-domain"
            />
          </>
        )}
      </NextHead>
    </>
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
