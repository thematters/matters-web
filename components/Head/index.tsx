import getConfig from 'next/config'
import NextHead from 'next/head'

import IMAGE_INTRO from '~/static/images/intro.jpg'

const {
  publicRuntimeConfig: { SITE_DOMIAN }
} = getConfig()

interface HeadProps {
  title?: string
  description?: string
  keywords?: string[]
  path?: string
  image?: string
}

console.log(SITE_DOMIAN, 'SITE_DOMIAN')

export const Head: React.FC<HeadProps> = ({
  title,
  description,
  keywords,
  path,
  image
}) => {
  const head = {
    title: title ? `${title} - Matters` : 'Matters',
    description: description || '一個自由、自主、永續的創作與公共討論空間',
    keywords: keywords
      ? `${keywords.join(',')},matters,matters.news,創作有價`
      : 'matters,matters.news,創作有價',
    url: path ? `${SITE_DOMIAN}${path}` : SITE_DOMIAN,
    image: image || IMAGE_INTRO
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
      <link rel="shortcut icon" key="favicon" href="" />

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
