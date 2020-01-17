import classNames from 'classnames'
import gql from 'graphql-tag'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import { ArticleNewSubscriberNotice as NoticeType } from './__generated__/ArticleNewSubscriberNotice'
import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const ArticleNewSubscriberNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = notice.actors && actorsCount > 1
  const avatarWrapClasses = classNames({
    'avatar-wrap': true,
    multi: isMultiActors
  })

  return (
    <section className="container">
      <section className={avatarWrapClasses}>
        {notice.actors.slice(0, 2).map((actor, index) => (
          <NoticeActorAvatar
            user={actor}
            key={index}
            size={isMultiActors ? 'md' : undefined}
          />
        ))}
      </section>

      <section className="content-wrap">
        <h4>
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
          <Translate zh_hant="收藏了你的作品" zh_hans="收藏了你的作品" />
        </h4>

        <NoticeArticle article={notice.target} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleNewSubscriberNotice.fragments = {
  notice: gql`
    fragment ArticleNewSubscriberNotice on ArticleNewSubscriberNotice {
      id
      unread
      __typename
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeDate.fragments.notice}
  `
}

export default ArticleNewSubscriberNotice
