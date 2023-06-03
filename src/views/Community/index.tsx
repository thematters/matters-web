import { useContext } from 'react'

import contentStyles from '~/common/styles/utils/content.article.css'
import { captureClicks, translate } from '~/common/utils'
import { Head, LanguageContext, Layout } from '~/components'

import content from './content'

const Community = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="community" />} />

      <Head title={{ id: 'community' }} />

      <Layout.Spacing>
        <section
          dangerouslySetInnerHTML={{
            __html: translate({
              ...content,
              lang,
            }),
          }}
          className="u-content"
          onClick={captureClicks}
        />
      </Layout.Spacing>
    </Layout.Main>
  )
}

export default Community
