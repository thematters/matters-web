import { useContext } from 'react'

import { Head, LanguageContext, Layout } from '~/components'

import contentStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'

import MiscTab from '../MiscTab'
import content from './content'

const Guide = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="guide" />}
      />

      <Head title={{ id: 'guide' }} />

      <MiscTab />

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

      <style jsx>{contentStyles}</style>
    </Layout>
  )
}

export default Guide
