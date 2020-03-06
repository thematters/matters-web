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
      <Head title={{ id: 'guide' }} />

      <Layout.Spacing>
        <MiscTab />

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
