import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { RevisedArticlePublishedNoticeFragment } from '~/gql/graphql'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import styles from '../styles.module.css'

const RevisedArticlePublishedNotice = ({
  notice,
}: {
  notice: RevisedArticlePublishedNoticeFragment
}) => {
  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.NOTICE_REVISED_ARTICLE_PUBLISHED}
    >
      <section className={styles.noticeActorsNameAndTitleInfo}>
        <FormattedMessage
          defaultMessage="Your work {articleTitle} has been republished to decentralized network"
          id="gN4jLB"
          description="src/components/Notice/ArticleNotice/RevisedArticlePublishedNotice.tsx"
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

RevisedArticlePublishedNotice.fragments = {
  notice: gql`
    fragment RevisedArticlePublishedNotice on ArticleNotice {
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

export default RevisedArticlePublishedNotice
