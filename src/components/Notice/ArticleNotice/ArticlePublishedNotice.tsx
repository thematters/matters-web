import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticlePublishedNoticeFragment } from '~/gql/graphql'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const ArticlePublishedNotice = ({
  notice,
}: {
  notice: ArticlePublishedNoticeFragment
}) => {
  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_ARTICLE_PUBLISHED}
    >
      <section className="avatar-wrap">
        <NoticeTypeIcon type="logo" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <FormattedMessage
            defaultMessage="Your article has been published to decentralized network"
            description="src/components/Notice/ArticleNotice/ArticlePublishedNotice.tsx"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
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
