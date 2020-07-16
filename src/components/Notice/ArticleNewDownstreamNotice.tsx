import { gql } from '@apollo/client'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeHead from './NoticeHead'
import NoticeTypeIcon from './NoticeTypeIcon'
import styles from './styles.css'

import { ArticleNewDownstreamNotice as NoticeType } from './__generated__/ArticleNewDownstreamNotice'

const ArticleNewDownstreamNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section className="container">
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="user" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead hasDate={isMultiActors} notice={notice}>
          {notice.actors.slice(0, 2).map((actor, index) => (
            <Fragment key={index}>
              <NoticeActorName user={actor} />
              {isMultiActors && index < 1 && <span>、</span>}
            </Fragment>
          ))}{' '}
          {isMultiActors && (
            <Translate
              zh_hant={`等 ${numAbbr(actorsCount)} 人`}
              zh_hans={`等 ${numAbbr(actorsCount)} 人`}
            />
          )}
          <Translate zh_hant="引申了你的作品" zh_hans="引申了你的作品" />{' '}
          <NoticeArticle article={notice.target} />
        </NoticeHead>

        <NoticeArticle article={notice.downstream} />

        {isMultiActors && (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} />
            ))}
          </section>
        )}
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleNewDownstreamNotice.fragments = {
  notice: gql`
    fragment ArticleNewDownstreamNotice on ArticleNewDownstreamNotice {
      id
      unread
      __typename
      ...NoticeHead
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      downstream {
        ...NoticeArticle
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
  `,
}

export default ArticleNewDownstreamNotice
