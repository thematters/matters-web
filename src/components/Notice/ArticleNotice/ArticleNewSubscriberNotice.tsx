import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleNewSubscriberNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'

const ArticleNewSubscriberNotice = ({
  notice,
}: {
  notice: ArticleNewSubscriberNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="bookmarked"
          id="CD688y"
          description="src/components/Notice/ArticleNotice/ArticleNewSubscriberNotice.tsx"
        />
      }
      title={<NoticeArticleTitle article={notice.article} />}
      testId={TEST_ID.NOTICE_ARTICLE_NEW_SUBSCRIBER}
    />
  )
}

ArticleNewSubscriberNotice.fragments = {
  notice: gql`
    fragment ArticleNewSubscriberNotice on ArticleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      article: target {
        ...NoticeArticleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleNewSubscriberNotice
