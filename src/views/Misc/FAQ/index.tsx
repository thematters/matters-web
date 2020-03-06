import { useContext } from 'react'

import { Head, LanguageContext, Layout } from '~/components'

import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'
import content from './content'

const FAQ = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout>
      <Head title={{ id: 'faq' }} />

      <Layout.Spacing>
        <MiscTab />

        <section
          dangerouslySetInnerHTML={{
            __html: translate({
              ...content,
              lang
            })
          }}
        />
      </Layout.Spacing>

      <style jsx global>
        {contentStyles}
      </style>
      <style jsx global>
        {detailsStyles}
      </style>
    </Layout>
  )
}

export default FAQ
