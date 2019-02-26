import gql from 'graphql-tag'

import NoticeArticle from './NoticeArticle'

const DownstreamArticleArchivedNotice = () => null

DownstreamArticleArchivedNotice.fragments = {
  notice: gql`
    fragment DownstreamArticleArchivedNotice on DownstreamArticleArchivedNotice {
      downstream {
        ...NoticeArticle
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
  `
}

export default DownstreamArticleArchivedNotice
