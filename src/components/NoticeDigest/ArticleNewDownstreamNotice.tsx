import classNames from 'classnames'
import gql from 'graphql-tag'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import { ArticleNewDownstreamNotice as NoticeType } from './__generated__/ArticleNewDownstreamNotice'
import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const ArticleNewDownstreamNotice = ({ notice }: { notice: NoticeType }) => {
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
            size={isMultiActors ? 'xsmall' : 'default'}
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
          <Translate zh_hant="引申了你的作品" zh_hans="引申了你的作品" />{' '}
          <NoticeArticle article={notice.target} />
        </h4>

        <NoticeArticle article={notice.downstream} />

        <NoticeDate notice={notice} />
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
      ...NoticeDate
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
    ${NoticeDate.fragments.notice}
  `
}

export default ArticleNewDownstreamNotice
