import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import ICON_AVATAR_LOGO from '~/static/icons/avatar-logo.svg'

import { ArticleTagHasBeenAddedNotice as NoticeType } from './__generated__/ArticleTagHasBeenAddedNotice'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import NoticeTag from './NoticeTag'
import styles from './styles.css'

const ArticleTagHasBeenAddedNotice = ({ notice }: { notice: NoticeType }) => {
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
          <Translate zh_hant=" 太精彩，" zh_hans=" 太精彩，" />
          <NoticeActorName user={notice.actor} />
          <Translate zh_hant=" 斗膽把它加入了 " zh_hans=" 斗胆把它加入了 " />
          <NoticeTag tag={notice.tag} />
        </h4>

        <NoticeDate notice={notice} />
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

export default ArticleTagHasBeenAddedNotice
