import { gql } from '@apollo/client'

import { Translate } from '~/components'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { RevisedArticlePublishedNotice as NoticeType } from './__generated__/RevisedArticlePublishedNotice'

const RevisedArticlePublishedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="logo" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <Translate
            zh_hant="你的修訂作品已發布到分佈式網絡"
            zh_hans="你的修订作品已发布到分布式网络"
            en="Your article has been republished to decentralized network"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

RevisedArticlePublishedNotice.fragments = {
  notice: gql`
    fragment RevisedArticlePublishedNotice on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleCard
      }
    }
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default RevisedArticlePublishedNotice
