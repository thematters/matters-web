import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticle from '../NoticeArticle'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { ArticleMentionedYouNotice as NoticeType } from './__generated__/ArticleMentionedYouNotice'

const ArticleMentionedYouNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <NoticeActorName user={actor} />{' '}
          <Translate zh_hant="在作品中提及了你" zh_hans="在作品中提及了你" />
        </NoticeHead>

        <NoticeArticle article={notice.article} isBlock />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleMentionedYouNotice.fragments = {
  notice: gql`
    fragment ArticleMentionedYouNotice on ArticleNotice {
      id
      ...NoticeHead
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      article: target {
        ...NoticeArticle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
  `,
}

export default ArticleMentionedYouNotice
