import gql from 'graphql-tag'

import { Icon, Translate } from '~/components'

import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeHead from './NoticeHead'
import NoticeTag from './NoticeTag'
import styles from './styles.css'

import { ArticleTagHasBeenAddedNotice as NoticeType } from './__generated__/ArticleTagHasBeenAddedNotice'

const ArticleTagHasBeenAddedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actor) {
    return null
  }

  return (
    <section className="container">
      <section className="avatar-wrap">
        <Icon.AvatarLogo size="lg" />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <Translate zh_hant="你的作品 " zh_hans="你的作品 " />
          <NoticeArticle article={notice.target} />
          <Translate zh_hant=" 已經被 " zh_hans=" 已經被 " />
          <NoticeActorName user={notice.actor} />
          <Translate zh_hant="  加入 " zh_hans=" 加入 " />
          <NoticeTag tag={notice.tag} />
          <Translate zh_hant="  的精選文集了" zh_hans=" 的精选文集了" />
        </NoticeHead>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagHasBeenAddedNotice.fragments = {
  notice: gql`
    fragment ArticleTagHasBeenAddedNotice on ArticleTagHasBeenAddedNotice {
      id
      unread
      __typename
      ...NoticeHead
      actor {
        ...NoticeActorNameUser
      }
      target {
        ...NoticeArticle
      }
      tag {
        ...NoticeTag
      }
    }
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
    ${NoticeTag.fragments.tag}
  `
}

export default ArticleTagHasBeenAddedNotice
