import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'
import { RevisedArticleNotPublishedNotice as NoticeType } from './__generated__/RevisedArticleNotPublishedNotice'

const RevisedArticleNotPublishedNotice = ({
  notice,
}: {
  notice: NoticeType
}) => {
  return (
    <section
      className="container"
      data-test-id={TEST_ID.REVISED_ARTICLE_NOT_PUBLISHED}
    >
      <section className="avatar-wrap">
        <NoticeTypeIcon type="logo" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <Translate
            zh_hant="你的修訂作品發布失敗"
            zh_hans="你的修订作品发布失败"
            en="Failed to republish article"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

RevisedArticleNotPublishedNotice.fragments = {
  notice: gql`
    fragment RevisedArticleNotPublishedNotice on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleCard
      }
    }
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default RevisedArticleNotPublishedNotice
