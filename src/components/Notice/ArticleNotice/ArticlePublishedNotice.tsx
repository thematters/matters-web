import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticlePublishedNoticeFragment } from '~/gql/graphql'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import styles from '../styles.module.css'

const ArticlePublishedNotice = ({
  notice,
}: {
  notice: ArticlePublishedNoticeFragment
}) => {
  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.NOTICE_ARTICLE_PUBLISHED}
    >
      <section className={styles.noticeActorsNameAndTitleInfo}>
        <FormattedMessage
          defaultMessage="Your work {articleTitle} has been published to decentralized network"
          id="tEeEJT"
          description="src/components/Notice/ArticleNotice/ArticlePublishedNotice.tsx"
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

ArticlePublishedNotice.fragments = {
  notice: gql`
    fragment ArticlePublishedNotice on ArticleNotice {
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

export default ArticlePublishedNotice
