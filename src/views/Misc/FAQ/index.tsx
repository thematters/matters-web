import { useContext } from 'react'

import { Head, LanguageContext, Layout } from '~/components'

import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'
import content from './content'
import styles from './styles.css'

const FAQ = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="faq" />}
      />

      <Head title={{ id: 'faq' }} />

      <MiscTab />

      <Layout.Spacing>
        <section
          className="faq"
          dangerouslySetInnerHTML={{
            __html: translate({
              ...content,
              lang
            })
          }}
        />
      </Layout.Spacing>

      <style jsx>{styles}</style>
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
