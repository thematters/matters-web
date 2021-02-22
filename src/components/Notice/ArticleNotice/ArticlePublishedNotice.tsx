import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeArticle from '../NoticeArticle'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { ArticlePublishedNotice as NoticeType } from './__generated__/ArticlePublishedNotice'

const ArticlePublishedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="logo" />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <Translate
            zh_hant="你的作品已發布到分佈式網絡"
            zh_hans="你的作品已发布到分布式网络"
            en="Your work has been published to decentralized network"
          />
        </NoticeHead>

        <NoticeArticle article={notice.article} isBlock />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticlePublishedNotice.fragments = {
  notice: gql`
    fragment ArticlePublishedNotice on ArticleNotice {
      id
      ...NoticeHead
      article: target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
  `,
}

export default ArticlePublishedNotice
