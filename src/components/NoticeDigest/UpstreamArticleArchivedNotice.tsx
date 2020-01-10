import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import ICON_AVATAR_LOGO from '~/static/icons/avatar-logo.svg'

import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

import { UpstreamArticleArchivedNotice as NoticeType } from './__generated__/UpstreamArticleArchivedNotice'

const UpstreamArticleArchivedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <Avatar src={ICON_AVATAR_LOGO} />
      </section>

      <section className="content-wrap">
        <h4>
          <Translate zh_hant="你的作品上游" zh_hans="你的作品上游" />{' '}
          <NoticeArticle article={notice.upstream} />{' '}
          <Translate zh_hant="已断开" zh_hans="已断开" />
        </h4>

        <NoticeArticle article={notice.target} />

        <NoticeDate notice={notice} />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

UpstreamArticleArchivedNotice.fragments = {
  notice: gql`
    fragment UpstreamArticleArchivedNotice on UpstreamArticleArchivedNotice {
      id
      unread
      __typename
      ...NoticeDate
      upstream {
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

export default UpstreamArticleArchivedNotice
