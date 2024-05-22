import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { RevisedArticleNotPublishedNoticeFragment } from '~/gql/graphql'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import styles from '../styles.module.css'

const RevisedArticleNotPublishedNotice = ({
  notice,
}: {
  notice: RevisedArticleNotPublishedNoticeFragment
}) => {
  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.NOTICE_REVISED_ARTICLE_NOT_PUBLISHED}
    >
      <section className={styles.noticeActorsNameAndTitleInfo}>
        <FormattedMessage
          defaultMessage="Failed to republish {articleTitle}"
          id="24jhEp"
          description="src/components/Notice/ArticleNotice/RevisedArticleNotPublishedNotice.tsx"
          values={{
            articleTitle: <NoticeArticleTitle article={notice.article} />,
          }}
        />
      </section>

      <section className={styles.footer}>
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
