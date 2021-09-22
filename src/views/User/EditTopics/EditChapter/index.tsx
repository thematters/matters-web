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
import ChapterHead from './ChapterHead'
import DropdownActions from './DropdownActions'
import { EDIT_TOPIC_CHAPTER_DETAIL } from './gql'
import styles from './styles.css'

import { EditTopicChapterDetail } from './__generated__/EditTopicChapterDetail'

const EditTopicsChapter = () => {
  // const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const id = getQuery('chapterId')

  const { data, loading } = useQuery<EditTopicChapterDetail>(
    EDIT_TOPIC_CHAPTER_DETAIL,
    {
      fetchPolicy: 'network-only',
      variables: { id },
    }
  )

  const chapter = data?.node?.__typename === 'Chapter' ? data.node : null

  if (loading) {
    return (
      <Layout.Main bgColor="grey-lighter">
        <Spinner />
      </Layout.Main>
    )
  }

  if (!chapter) {
    return (
      <Layout.Main bgColor="grey-lighter">
        <Throw404 />
      </Layout.Main>
    )
  }

  const ChapterLayout: React.FC = ({ children }) => (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <Layout.Header.Title id="chapter" />
            <DropdownActions chapter={chapter} />
          </>
        }
      />

      <Head title={{ id: 'chapter' }} />

      <ChapterHead chapter={chapter} />

      {children}
    </Layout.Main>
  )

  if (!chapter.articles || chapter.articles.length <= 0) {
    return (
      <ChapterLayout>
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
                zh_hant="點擊＋新增，添加作品豐富主題"
                zh_hans="点击＋新增，添加作品丰富主题"
                en="Click + to add article"
              />
            </>
          }
        />
      </ChapterLayout>
    )
  }

  return (
    <ChapterLayout>
      <section className="articles">
        <ArticleList articles={chapter.articles} />

        <style jsx>{styles}</style>
      </section>
    </ChapterLayout>
  )
}

export default EditTopicsChapter
