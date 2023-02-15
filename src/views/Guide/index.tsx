import Markdown from 'markdown-to-jsx'
import { useContext } from 'react'

import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { captureClicks, toLocale } from '~/common/utils'
import { Head, LanguageContext, Layout } from '~/components'

import en from './content_en'
import zh_Hans from './content_ZhHans'
import zh_Hant from './content_ZhHant'

const content = {
  en: en,
  'zh-Hans': zh_Hans,
  'zh-Hant': zh_Hant,
}

const Guide = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="guide" />}
      />

      <Head title={{ id: 'guide' }} />

      <Layout.Spacing>
        <section className="u-content" onClick={captureClicks}>
          <Markdown>{content[toLocale(lang) || 'en']}</Markdown>
        </section>
      </Layout.Spacing>

      <style jsx global>
        {contentStyles}
      </style>
      <style jsx global>
        {detailsStyles}
      </style>
    </Layout.Main>
  )
}

export default Guide
