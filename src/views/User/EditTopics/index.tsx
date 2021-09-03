import { useContext } from 'react'

import {
  EmptyTopic,
  Head,
  IconAdd24,
  LanguageContext,
  Layout,
} from '~/components'

import { translate } from '~/common/utils'

const EditTopics = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <Layout.Header.Title id="editTopics" />
            <button
              type="button"
              aria-label={translate({
                zh_hant: '新增主題',
                zh_hans: '新增主题',
                en: 'Add Topic',
                lang,
              })}
            >
              <IconAdd24 size="lg" />
            </button>
          </>
        }
      />

      <Head title={{ id: 'editTopics' }} />

      <EmptyTopic />
    </Layout.Main>
  )
}

export default EditTopics
