import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import ICON_AVATAR_LOGO from '~/static/icons/avatar-logo.svg?url'

import { ArticleTagHasBeenRemovedNotice as NoticeType } from './__generated__/ArticleTagHasBeenRemovedNotice'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import NoticeTag from './NoticeTag'
import styles from './styles.css'

const ArticleTagHasBeenRemovedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actor) {
    return null
  }

  return (
    <section className="container">
      <section className="avatar-wrap">
        <Avatar src={ICON_AVATAR_LOGO} />
      </section>

      <section className="content-wrap">
        <h4>
          <Translate zh_hant="你的作品 " zh_hans="你的作品 " />
          <NoticeArticle article={notice.target} />
          <Translate zh_hant=" 已經被 " zh_hans=" 已經被 " />
          <NoticeActorName user={notice.actor} />
          <Translate zh_hant=" 從 " zh_hans=" 從 " />
          <NoticeTag tag={notice.tag} />
          <Translate zh_hant=" 移除了" zh_hans=" 移除了" />
        </h4>

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagHasBeenRemovedNotice.fragments = {
  notice: gql`
    fragment ArticleTagHasBeenRemovedNotice on ArticleTagHasBeenRemovedNotice {
      id
      unread
      __typename
      ...NoticeDate
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
    ${NoticeTag.fragments.tag}
    ${NoticeDate.fragments.notice}
  `
}

export default ArticleTagHasBeenRemovedNotice
