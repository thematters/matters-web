import { useContext } from 'react'
import { useIntl } from 'react-intl'

import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { captureClicks } from '~/common/utils'
import { Head, LanguageContext, Layout } from '~/components'

import content from './content'

const Guide = () => {
  const { lang } = useContext(LanguageContext)

  const intl = useIntl()
  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="guide" />}
      />

      <Head title={{ id: 'guide' }} />

      <Layout.Spacing>
        <section
          dangerouslySetInnerHTML={{
            // richtext translation
            __html: intl.formatMessage(
              {
                defaultMessage: '{content}',
                description: 'src/views/Guide/index.tsx',
              },
              {
                content: content[lang],
              }
            ),
          }}
          className="u-content"
          onClick={captureClicks}
        />
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
