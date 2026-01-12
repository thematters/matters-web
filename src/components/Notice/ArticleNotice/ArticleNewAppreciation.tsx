import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ArticleNewAppreciationFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const ArticleNewAppreciation = ({
  notice,
}: {
  notice: ArticleNewAppreciationFragment
}) => {
  return (
    <NoticeCard
      notice={notice}
      type="appreciation"
      action={
        <FormattedMessage
          defaultMessage="liked"
          id="p5qZnJ"
          description="src/components/Notice/ArticleNotice/ArticleNewAppreciationNotice.tsx"
        />
      }
      content={<ArticleCard article={notice.article} />}
    />
  )
}

ArticleNewAppreciation.fragments = {
  notice: gql`
    fragment ArticleNewAppreciation on ArticleNotice {
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

export default ArticleNewAppreciation
