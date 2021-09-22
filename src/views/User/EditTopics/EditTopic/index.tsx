import { useQuery } from '@apollo/react-hooks'

import {
  EmptyArticle,
  Head,
  Layout,
  Spinner,
  Throw404,
  Translate,
  useRoute,
} from '~/components'

import ArticleList from '../ContentList/ArticleList'
import ChapterList from '../ContentList/ChapterList'
import DropdownActions from './DropdownActions'
import { EDIT_TOPIC_TOPIC_DETAIL } from './gql'
import styles from './styles.css'
import TopicHead from './TopicHead'

import { EditTopicTopicDetail } from './__generated__/EditTopicTopicDetail'

const EditTopicsTopic = () => {
  // const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const id = getQuery('topicId')

  const { data, loading } = useQuery<EditTopicTopicDetail>(
    EDIT_TOPIC_TOPIC_DETAIL,
    { fetchPolicy: 'network-only', variables: { id } }
  )

  const topic = data?.node?.__typename === 'Topic' ? data.node : null

  if (loading) {
    return (
      <Layout.Main bgColor="grey-lighter">
        <Spinner />
      </Layout.Main>
    )
  }

  if (!topic) {
    return (
      <Layout.Main bgColor="grey-lighter">
        <Throw404 />
      </Layout.Main>
    )
  }

  const TopicLayout: React.FC = ({ children }) => (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <Layout.Header.Title id="topic" />
            <DropdownActions topic={topic} />
          </>
        }
      />

      <Head title={{ id: 'topic' }} />

      <TopicHead topic={topic} />

      {children}
    </Layout.Main>
  )

  const hasContent = topic.chapterCount > 0 || topic.articleCount > 0

  if (!hasContent) {
    return (
      <TopicLayout>
        <EmptyArticle
          description={
            <>
              <Translate
                zh_hant="還沒有建立內容"
                zh_hans="还没有建立內容"
                en="No contens."
              />
              <br />
              <Translate
                zh_hant="點擊＋新增，添加作品和章節豐富主題"
                zh_hans="点击＋新增，添加作品和章节丰富主题"
                en="Click + to add chapter or article"
              />
            </>
          }
        />
      </TopicLayout>
    )
  }

  return (
    <TopicLayout>
      {topic.articles && topic.articles.length > 0 && (
        <section className="articles">
          <ArticleList articles={topic.articles} />
        </section>
      )}

      {topic.chapters && topic.chapters.length > 0 && (
        <section className="chapters">
          <ChapterList chapters={topic.chapters} />
        </section>
      )}

      <style jsx>{styles}</style>
    </TopicLayout>
  )
}

export default EditTopicsTopic
