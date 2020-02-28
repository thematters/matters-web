import gql from 'graphql-tag'
import { Fragment } from 'react'

import { Icon, Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeComment from './NoticeComment'
import NoticeHead from './NoticeHead'
import styles from './styles.css'

import { SubscribedArticleNewCommentNotice as NoticeType } from './__generated__/SubscribedArticleNewCommentNotice'

const SubscribedArticleNewCommentNotice = ({
  notice
}: {
  notice: NoticeType
}) => {
  if (!notice || !notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = notice.actors && actorsCount > 1

  return (
    <section className="container">
      <section className="avatar-wrap">
        {isMultiActors ? (
          <Icon.Comment color="green" style={{ margin: '0.5rem' }} />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead hasDate={isMultiActors} notice={notice}>
          {notice.actors.slice(0, 2).map((actor, index) => (
            <Fragment key={index}>
              <NoticeActorName user={actor} />
              {index < actorsCount - 1 && <span>、</span>}
            </Fragment>
          ))}{' '}
          {isMultiActors && (
            <Translate
              zh_hant={`等 ${numAbbr(actorsCount)} 人`}
              zh_hans={`等 ${numAbbr(actorsCount)} 人`}
            />
          )}
          <Translate
            zh_hant="評論了你收藏的作品"
            zh_hans="评论了你收藏的作品"
          />{' '}
          <NoticeArticle article={notice.target} />
        </NoticeHead>

        {isMultiActors ? (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <Fragment key={index}>
                <NoticeActorAvatar user={actor} />
              </Fragment>
            ))}
          </section>
        ) : (
          <NoticeComment comment={notice.comment} />
        )}
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

SubscribedArticleNewCommentNotice.fragments = {
  notice: gql`
    fragment SubscribedArticleNewCommentNotice on SubscribedArticleNewCommentNotice {
      id
      unread
      __typename
      ...NoticeHead
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeArticle
      }
      comment {
        ...NoticeComment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeComment.fragments.comment}
    ${NoticeHead.fragments.date}
  `
}

export default SubscribedArticleNewCommentNotice
