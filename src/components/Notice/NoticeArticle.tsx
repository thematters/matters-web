import classNames from 'classnames'
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

  const linkClasses = classNames({
    'article-block': isBlock
  })

  const path = toPath({
    page: 'articleDetail',
    article
  })

  return (
    <>
      <Link {...path}>
        <a className={linkClasses}>{article.title}</a>
      </Link>
      <style jsx>{styles}</style>
    </>
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
