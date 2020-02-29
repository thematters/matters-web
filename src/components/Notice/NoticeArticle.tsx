import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { NoticeArticle as NoticeArticleType } from './__generated__/NoticeArticle'

const NoticeArticle = ({
  article,
  isBlock = false
}: {
  article: NoticeArticleType | null
  isBlock?: boolean
}) => {
  if (!article) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    article
  })

  if (!isBlock) {
    return (
      <Link {...path}>
        <a>{article.title}</a>
      </Link>
    )
  }

  return (
    <section className="article-block">
      <Link {...path}>
        <a>{article.title}</a>
      </Link>
      <style jsx>{styles}</style>
    </section>
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
