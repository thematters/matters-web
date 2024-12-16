import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CircleNewArticleNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'

const CircleNewArticle = ({
  notice,
}: {
  notice: CircleNewArticleNoticeFragment
}) => {
  const circle = notice.article.access.circle
  if (!circle) {
    return null
  }
  const actors = [notice.article.author]

  return (
    <NoticeDigest
      notice={{ ...notice, actors }}
      action={
        <FormattedMessage
          description="src/components/Notice/ArticleNotice/CircleNewArticle.tsx"
          defaultMessage="published in {circleName}"
          id="GVes61"
          values={{
            circleName: <NoticeCircleName circle={circle} />,
          }}
        />
      }
      content={<NoticeArticleCard article={notice.article} />}
      testId={TEST_ID.NOTICE_CIRCLE_NEW_ARTICLE}
    />
  )
}

CircleNewArticle.fragments = {
  notice: gql`
    fragment CircleNewArticleNotice on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleCard
        author {
          ...NoticeActorAvatarUser
          ...NoticeActorNameUser
        }
        access {
          circle {
            id
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeArticleCard.fragments.article}
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeDate.fragments.notice}
    ${NoticeCircleName.fragments.circle}
  `,
}

export default CircleNewArticle
