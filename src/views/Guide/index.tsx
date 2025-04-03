import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import ReactMarkdown from 'react-markdown'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { captureClicks, toLocale } from '~/common/utils'
import { Head, LanguageContext, Layout } from '~/components'

import en from './content_en'
import zh_Hans from './content_ZhHans'
import zh_Hant from './content_ZhHant'

const content = {
  en,
  'zh-Hans': zh_Hans,
  'zh-Hant': zh_Hant,
}

const Guide = () => {
  const intl = useIntl()
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Explore Matters" id="uVCg1l" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Explore Matters',
          id: 'uVCg1l',
        })}
        image={IMAGE_INTRO.src}
      />

      <Layout.Main.Spacing>
        <section className="u-content-article" onClick={captureClicks}>
          <ReactMarkdown>{content[toLocale(lang) || 'en']}</ReactMarkdown>
        </section>
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Guide
