import gql from 'graphql-tag'

import NoticeArticle from './NoticeArticle'

const UpstreamArticleArchivedNotice = () => null

UpstreamArticleArchivedNotice.fragments = {
  notice: gql`
    fragment UpstreamArticleArchivedNotice on UpstreamArticleArchivedNotice {
      upstream {
        ...NoticeArticle
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
  `
}

export default UpstreamArticleArchivedNotice
