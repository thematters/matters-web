import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeArticle from './NoticeArticle'
import NoticeHead from './NoticeHead'
import NoticeTypeIcon from './NoticeTypeIcon'
import styles from './styles.css'

import { DownstreamArticleArchivedNotice as NoticeType } from './__generated__/DownstreamArticleArchivedNotice'

const DownstreamArticleArchivedNotice = ({
  notice
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
            zh_hant="你的作品的引申作品"
            zh_hans="你的作品的引申作品"
          />{' '}
          <NoticeArticle article={notice.target} />{' '}
          <Translate zh_hant="被隐藏" zh_hans="被隐藏" />
        </NoticeHead>

        <NoticeArticle article={notice.downstream} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

DownstreamArticleArchivedNotice.fragments = {
  notice: gql`
    fragment DownstreamArticleArchivedNotice on DownstreamArticleArchivedNotice {
      id
      unread
      __typename
      ...NoticeHead
      downstream {
        ...NoticeArticle
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
  `
}

export default DownstreamArticleArchivedNotice
