import { useContext } from 'react'

import { Head, LanguageContext, Layout } from '~/components'

import contentStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'

import content from './content'

const Community = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="community" />}
        marginBottom={0}
      />

      <Head title={{ id: 'community' }} />

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

export default Community
