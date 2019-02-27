import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'

import { NoticeArticle as NoticeArticleType } from './__generated__/NoticeArticle'

const NoticeArticle = ({ article }: { article: NoticeArticleType }) => {
  const path = toPath({
    page: 'articleDetail',
    userName: article.author.userName || '',
    slug: article.slug || '',
    mediaHash: article.mediaHash || ''
  })

  return (
    <Link {...path}>
      <a>{article.title}</a>
    </Link>
  )
}

NoticeArticle.fragments = {
  article: gql`
    fragment NoticeArticle on Article {
      id
      title
      slug
      mediaHash
      author {
        id
        userName
      }
    }
  `
}

export default NoticeArticle
