import getConfig from 'next/config'
import NextHead from 'next/head'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext } from 'react'

import { LanguageContext } from '~/components'

import { translate } from '~/common/utils'
import FAVICON_16 from '~/static/favicon-16x16.png?url'
import FAVICON_32 from '~/static/favicon-32x32.png?url'
import IMAGE_INTRO from '~/static/images/intro.jpg'

const {
  publicRuntimeConfig: { SITE_DOMIAN }
} = getConfig()

interface HeadProps {
  title?: string | { zh_hant: string; zh_hans?: string; en?: string }
  description?: string
  keywords?: string[]
  path?: string
  image?: string
}

const BaseHead: React.FC<WithRouterProps & HeadProps> = props => {
  const { lang } = useContext(LanguageContext)
  const title =
    typeof props.title === 'object'
      ? translate({ ...props.title, lang })
      : props.title

  const asPath = props.router && props.router.asPath

  const head = {
    title: title ? `${title} - Matters` : 'Matters',
    description:
      props.description || '一個自由、自主、永續的創作與公共討論空間',
    keywords: props.keywords
      ? `${props.keywords.join(',')},matters,matters.news,創作有價`
      : 'matters,matters.news,創作有價',
    url: props.path
      ? `${SITE_DOMIAN}${props.path}`
      : asPath
      ? `${SITE_DOMIAN}${asPath}`
      : SITE_DOMIAN,
    image: props.image || IMAGE_INTRO
  }

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

      {/* social */}
      <meta property="og:site_name" key="og:site_name" content="Matters" />
      <meta property="og:url" key="og:url" content={head.url} />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:image" key="og:image" content={head.image} />
      <meta
        property="og:description"
        key="og:description"
        content={head.description}
      />
      <meta property="og:locale" key="og:locale" content="zh_HK" />
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
    </NextHead>
  )
}

export const Head = withRouter(BaseHead)
