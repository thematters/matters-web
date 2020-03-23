import { useContext } from 'react'

import { Head, LanguageContext, Layout } from '~/components'

import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { translate } from '~/common/utils'

import content from './content'

const Guide = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="guide" />}
        marginBottom={0}
      />

      <Head title={{ id: 'guide' }} />

      <Layout.Spacing>
        <section
          dangerouslySetInnerHTML={{
            __html: translate({
              ...content,
              lang
            })
          }}
          className="u-content"
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
