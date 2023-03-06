import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleNewAppreciationNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const ArticleNewAppreciationNotice = ({
  notice,
}: {
  notice: ArticleNewAppreciationNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section
      className="container"
      data-test-id={TEST_ID.ARTICLE_NEW_APPRECIATION}
    >
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="appreciate" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />
          <FormattedMessage
            defaultMessage="liked your article"
            description="src/components/Notice/ArticleNotice/ArticleNewAppreciationNotice.tsx"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        {isMultiActors && (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} size="md" />
            ))}
          </section>
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleNewAppreciationNotice.fragments = {
  notice: gql`
    fragment ArticleNewAppreciationNotice on ArticleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      article: target {
        ...NoticeArticleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleNewAppreciationNotice
