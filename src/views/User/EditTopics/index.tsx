import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  EmptyTopic,
  Head,
  IconAdd16,
  InfiniteScroll,
  LanguageContext,
  Layout,
  Spinner,
} from '~/components'

import { mergeConnections, translate } from '~/common/utils'

import TopicList from './ContentList/TopicList'
import PutTopicDialog from './Dialogs/PutTopicDialog'
import { EDIT_TOPIC_TOPICS } from './gql'

import { EditTopicTopics } from './__generated__/EditTopicTopics'

const BaseEditTopics = () => {
  const { data, loading, fetchMore } = useQuery<EditTopicTopics>(
    EDIT_TOPIC_TOPICS,
    { fetchPolicy: 'network-only' }
  )

  const connectionPath = 'viewer.topics'
  const { edges, pageInfo } = data?.viewer?.topics || {}

  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTopic />
  }

  const loadMore = () =>
    fetchMore({
      variables: { first: 20, after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <TopicList topics={edges.map((edge) => edge.node)} />
    </InfiniteScroll>
  )
}

const EditTopics = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <Layout.Header.Title id="editTopics" />

            <PutTopicDialog>
              {({ openDialog: openPutTopicDialog }) => (
                <button
                  onClick={openPutTopicDialog}
                  type="button"
                  aria-label={translate({
                    zh_hant: '新增主題',
                    zh_hans: '新增主题',
                    en: 'Add Topic',
                    lang,
                  })}
                >
                  <IconAdd16 size="md-s" />
                </button>
              )}
            </PutTopicDialog>
          </>
        }
      />

      <Head title={{ id: 'editTopics' }} />

      <BaseEditTopics />
    </Layout.Main>
  )
}

export default EditTopics
