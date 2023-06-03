import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { RevisedArticleNotPublishedNoticeFragment } from '~/gql/graphql'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.module.css'

const RevisedArticleNotPublishedNotice = ({
  notice,
}: {
  notice: RevisedArticleNotPublishedNoticeFragment
}) => {
  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_REVISED_ARTICLE_NOT_PUBLISHED}
    >
      <section className="avatar-wrap">
        <NoticeTypeIcon type="logo" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <FormattedMessage
            defaultMessage="Failed to republish article"
            description="src/components/Notice/ArticleNotice/RevisedArticleNotPublishedNotice.tsx"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        <NoticeDate notice={notice} />
      </section>
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
