import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import ICON_AVATAR_LOGO from '~/static/icons/avatar-logo.svg'

import { DownstreamArticleArchivedNotice as NoticeType } from './__generated__/DownstreamArticleArchivedNotice'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const DownstreamArticleArchivedNotice = ({
  notice
}: {
  notice: NoticeType
}) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <Avatar src={ICON_AVATAR_LOGO} />
      </section>

      <section className="content-wrap">
        <h4>
          <Translate
            zh_hant="你的作品的引申作品"
            zh_hans="你的作品的引申作品"
          />{' '}
          <NoticeArticle article={notice.target} />{' '}
          <Translate zh_hant="被隐藏" zh_hans="被隐藏" />
        </h4>

        <NoticeArticle article={notice.downstream} />

        <NoticeDate notice={notice} />
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
      ...NoticeDate
      downstream {
        ...NoticeArticle
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
    ${NoticeDate.fragments.notice}
  `
}

export default DownstreamArticleArchivedNotice
