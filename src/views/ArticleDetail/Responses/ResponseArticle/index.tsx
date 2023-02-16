import gql from 'graphql-tag'

import { ArticleDigestSidebar, Translate, UserDigest } from '~/components'
import { ResponseArticleArticleFragment } from '~/gql/graphql'

import styles from './styles.css'

type ResponseArticleProps = {
  article: ResponseArticleArticleFragment
}

const fragments = {
  article: gql`
    fragment ResponseArticleArticle on Article {
      id
      author {
        id
        ...UserDigestMiniUser
      }
      ...ArticleDigestSidebarArticle
    }

    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestSidebar.fragments.article}
  `,
}

const ResponseArticle = ({ article }: ResponseArticleProps) => {
  return (
    <section className="container">
      <header>
        <UserDigest.Mini
          user={article.author}
          avatarSize="lg"
          textSize="md-s"
          textWeight="md"
          hasAvatar
          hasDisplayName
        />

        <span className="collected">
          <Translate
            zh_hant="關聯了本作品"
            zh_hans="关联了本作品"
            en="responded to this article"
          />
        </span>
      </header>

      <section className="article-digest">
        <ArticleDigestSidebar article={article} hasBackground />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ResponseArticle.fragments = fragments

export default ResponseArticle
