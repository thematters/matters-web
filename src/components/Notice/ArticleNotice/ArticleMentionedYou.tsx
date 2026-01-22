import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ArticleMentionedYouFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const ArticleMentionedYou = ({
  notice,
}: {
  notice: ArticleMentionedYouFragment
}) => {
  return (
    <NoticeCard
      notice={notice}
      type="comment"
      action={
        <FormattedMessage
          defaultMessage="mentioned you"
          id="Gju939"
          description="src/components/Notice/ArticleNotice/ArticleMentionedYouNotice.tsx"
        />
      }
      content={<ArticleCard article={notice.article} />}
    />
  )
}

ArticleMentionedYou.fragments = {
  notice: gql`
    fragment ArticleMentionedYou on ArticleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      article: target {
        ...NoticeArticleCard
        ...ArticleCardArticle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeArticleCard.fragments.article}
    ${ArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleMentionedYou
