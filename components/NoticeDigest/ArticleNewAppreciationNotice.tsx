import classNames from 'classnames'
import gql from 'graphql-tag'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { ArticleNewAppreciationNotice as NoticeType } from './__generated__/ArticleNewAppreciationNotice'
import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const ArticleNewAppreciationNotice = ({ notice }: { notice: NoticeType }) => {
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
        {notice.actors.slice(0, 2).map(actor => (
          <NoticeActorAvatar
            user={actor}
            key={actor.id}
            size={isMultiActors ? 'xsmall' : 'default'}
          />
        ))}
      </section>

      <section className="content-wrap">
        <h4>
          {notice.actors.slice(0, 2).map((actor, index) => (
            <Fragment key={actor.id}>
              <NoticeActorName user={actor} />
              {index < actorsCount - 1 && <span>、</span>}
            </Fragment>
          ))}{' '}
          {isMultiActors && (
            <Translate
              zh_hant={`等 ${actorsCount} 人`}
              zh_hans={`等 ${actorsCount} 人`}
            />
          )}
          <Translate zh_hant="讚賞了你的文章" zh_hans="赞赏了你的文章" />
          {notice.MAT && (
            <>
              <Translate zh_hant={`，獲得 `} zh_hans={`，获得 `} />
              <span className="highlight">
                <Translate
                  zh_hant={`${notice.MAT} MAT`}
                  zh_hans={`${notice.MAT} MAT`}
                />
              </span>
            </>
          )}
        </h4>

        <NoticeArticle article={notice.target} />

        <NoticeDate notice={notice} />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

ArticleNewAppreciationNotice.fragments = {
  notice: gql`
    fragment ArticleNewAppreciationNotice on ArticleNewAppreciationNotice {
      id
      unread
      __typename
      ...NoticeDate
      MAT
      target {
        ...NoticeArticle
      }
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeDate.fragments.notice}
  `
}

export default ArticleNewAppreciationNotice
