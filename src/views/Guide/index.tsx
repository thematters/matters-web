import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

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
      <Layout.Header left={<Layout.Header.Title id="guide" />} />

      <Head title={{ id: 'guide' }} />

      <Layout.Main.Spacing>
        <section className="u-content" onClick={captureClicks}>
          <ReactMarkdown>{content[toLocale(lang) || 'en']}</ReactMarkdown>
        </section>
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Guide
