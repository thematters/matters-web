import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'
import { Translate } from '~/components/Language'

import ICON_AVATAR_MAT from '~/static/icons/avatar-mat.svg?url'

import { ArticlePublishedNotice as NoticeType } from './__generated__/ArticlePublishedNotice'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const ArticlePublishedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <Avatar src={ICON_AVATAR_MAT} />
      </section>

      <section className="content-wrap">
        <h4>
          <Translate
            zh_hant="你的文章已發佈到分佈式網絡"
            zh_hans="你的文章已发布到分布式网络"
          />
        </h4>

        <NoticeArticle article={notice.target} />

        <NoticeDate notice={notice} />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

ArticlePublishedNotice.fragments = {
  notice: gql`
    fragment ArticlePublishedNotice on ArticlePublishedNotice {
      id
      unread
      __typename
      ...NoticeDate
      target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
    ${NoticeDate.fragments.notice}
  `
}

export default ArticlePublishedNotice
