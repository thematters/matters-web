import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TopicChannelFeedbackAcceptedNoticeFragment } from '~/gql/graphql'

import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import styles from '../styles.module.css'

const TopicChannelFeedbackAcceptedNotice = ({
  notice,
}: {
  notice: TopicChannelFeedbackAcceptedNoticeFragment
}) => {
  return (
    <section className={styles.container}>
      <section className={styles.noticeActorsNameAndTitleInfo}>
        <FormattedMessage
          defaultMessage="Your channel suggestion for {articleTitle} has been accepted by the editor. Thank you for supporting Matters!"
          id="EnAfl8"
          description="src/components/Notice/ArticleNotice/TopicChannelFeedbackAcceptedNotice.tsx"
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

TopicChannelFeedbackAcceptedNotice.fragments = {
  notice: gql`
    fragment TopicChannelFeedbackAcceptedNotice on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleTitle
      }
    }
    ${NoticeArticleTitle.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default TopicChannelFeedbackAcceptedNotice
