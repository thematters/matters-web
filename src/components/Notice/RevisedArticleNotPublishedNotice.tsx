import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeArticle from './NoticeArticle'
import NoticeHead from './NoticeHead'
import NoticeTypeIcon from './NoticeTypeIcon'
import styles from './styles.css'

import { RevisedArticleNotPublishedNotice as NoticeType } from './__generated__/RevisedArticleNotPublishedNotice'

const RevisedArticleNotPublishedNotice = ({
  notice,
}: {
  notice: NoticeType
}) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="logo" />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <Translate
            zh_hant="你的修訂作品發布失敗"
            zh_hans="你的修订作品发布失败"
          />
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

RevisedArticleNotPublishedNotice.fragments = {
  notice: gql`
    fragment RevisedArticleNotPublishedNotice on RevisedArticleNotPublishedNotice {
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
  `,
}

export default RevisedArticleNotPublishedNotice
