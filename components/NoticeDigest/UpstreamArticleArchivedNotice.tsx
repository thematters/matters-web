import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'
import { Translate } from '~/components/Language'

import ICON_AVATAR_MAT from '~/static/icons/avatar-mat.svg?url'

import { UpstreamArticleArchivedNotice as NoticeType } from './__generated__/UpstreamArticleArchivedNotice'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const UpstreamArticleArchivedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <Avatar src={ICON_AVATAR_MAT} />
      </section>

      <section className="content-wrap">
        <h4>
          <Translate zh_hant="你的文章上游" zh_hans="你的文章上游" />{' '}
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
