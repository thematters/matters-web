import classNames from 'classnames'
import gql from 'graphql-tag'

import { Translate } from '~/components'

import { ArticleNewCollectedNotice as NoticeType } from './__generated__/ArticleNewCollectedNotice'
import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const ArticleNewCollectedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actor) {
    return null
  }

  const avatarWrapClasses = classNames({
    'avatar-wrap': true
  })

  return (
    <section className="container">
      <section className={avatarWrapClasses}>
        <NoticeActorAvatar user={notice.actor} size={'default'} />
      </section>

      <section className="content-wrap">
        <h4>
          <Translate zh_hant="恭喜！你的大作" zh_hans="恭喜！你的大作" />{' '}
          <NoticeArticle article={notice.target} />{' '}
          <Translate zh_hant="已被" zh_hans="已被" />{' '}
          <NoticeActorName user={notice.actor} />{' '}
          <Translate zh_hant="在其作品" zh_hans="在其作品" />{' '}
          <NoticeArticle article={notice.collection} />{' '}
          <Translate zh_hant="中關聯推薦" zh_hans="中关联推荐" />
        </h4>

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleNewCollectedNotice.fragments = {
  notice: gql`
    fragment ArticleNewCollectedNotice on ArticleNewCollectedNotice {
      id
      unread
      __typename
      ...NoticeDate
      actor {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      collection {
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

export default ArticleNewCollectedNotice
