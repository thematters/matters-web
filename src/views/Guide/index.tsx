import Markdown from 'markdown-to-jsx';
import { useContext } from 'react'

import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { captureClicks } from '~/common/utils'
import { Head, LanguageContext, Layout } from '~/components'

import content from './content_en'

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
        <section
          className="u-content"
          onClick={captureClicks}
        >
        <Markdown>
          {content}
        </Markdown>

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
