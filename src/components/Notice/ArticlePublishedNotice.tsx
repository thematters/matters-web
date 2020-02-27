import gql from 'graphql-tag'

import { Icon, Translate } from '~/components'

import NoticeArticle from './NoticeArticle'
import NoticeHead from './NoticeHead'
import styles from './styles.css'

import { ArticlePublishedNotice as NoticeType } from './__generated__/ArticlePublishedNotice'

const ArticlePublishedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <Icon.AvatarLogo size="lg" />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <Translate
            zh_hant="你的作品已發佈到分佈式網絡"
            zh_hans="你的作品已发布到分布式网络"
          />
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />
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
      ...NoticeHead
      target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
  `
}

export default ArticlePublishedNotice
