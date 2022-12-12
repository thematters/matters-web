import gql from 'graphql-tag'

import { Translate } from '~/components'

import { TEST_ID } from '~/common/enums'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { ArticlePublishedNotice as NoticeType } from './__generated__/ArticlePublishedNotice'

const ArticlePublishedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_ARTICLE_PUBLISHED}
    >
      <section className="avatar-wrap">
        <NoticeTypeIcon type="logo" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <Translate
            zh_hant="你的作品已發布到分佈式網絡"
            zh_hans="你的作品已发布到分布式网络"
            en="Your article has been published to decentralized network"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticlePublishedNotice.fragments = {
  notice: gql`
    fragment ArticlePublishedNotice on ArticleNotice {
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

export default ArticlePublishedNotice
