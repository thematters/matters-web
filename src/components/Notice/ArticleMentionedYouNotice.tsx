import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

import { ArticleMentionedYouNotice as NoticeType } from './__generated__/ArticleMentionedYouNotice'

const ArticleMentionedYouNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actor} key={notice.actor.id} />
      </section>

      <section className="content-wrap">
        <h4>
          <NoticeActorName user={notice.actor} />{' '}
          <Translate zh_hant="在作品中提及了你" zh_hans="在作品中提及了你" />
        </h4>

        <NoticeArticle article={notice.target} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleMentionedYouNotice.fragments = {
  notice: gql`
    fragment ArticleMentionedYouNotice on ArticleMentionedYouNotice {
      id
      unread
      __typename
      ...NoticeDate
      actor {
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

export default ArticleMentionedYouNotice
