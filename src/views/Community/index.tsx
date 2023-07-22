import { useContext } from 'react'

import { captureClicks, translate } from '~/common/utils'
import { Head, LanguageContext, Layout } from '~/components'

import content from './content'

const Community = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="community" />} />

      <Head title={{ id: 'community' }} />

      <Layout.Main.Spacing>
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
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Community
