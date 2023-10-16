import gql from 'graphql-tag'

import { ArticleDigestSidebar, Translate, UserDigest } from '~/components'
import { ResponseArticleArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

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
    <section className={styles.container}>
      <header className={styles.header}>
        <UserDigest.Mini
          user={article.author}
          avatarSize="lg"
          textSize="mdS"
          textWeight="md"
          hasAvatar
          hasDisplayName
        />

        <span className={styles.collected}>
          <Translate
            zh_hant="關聯了本作品"
            zh_hans="关联了本作品"
            en="responded to this article"
          />
        </span>
      </header>

      <section className={styles.articleDigest}>
        <ArticleDigestSidebar article={article} hasBackground />
      </section>
    </section>
  )
}

ResponseArticle.fragments = fragments

export default ResponseArticle
