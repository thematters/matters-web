import gql from 'graphql-tag'

import { ArticleDigest, Translate, UserDigest } from '~/components'

import styles from './styles.css'

import { ResponseArticleArticle } from './__generated__/ResponseArticleArticle'

interface ResponseArticleControls {
  hasCover?: boolean
}

type ResponseArticleProps = {
  article: ResponseArticleArticle
} & ResponseArticleControls

const fragments = {
  article: gql`
    fragment ResponseArticleArticle on Article {
      id
      author {
        id
        ...UserDigestMiniUser
      }
      ...SidebarDigestArticle
    }

    ${UserDigest.Mini.fragments.user}
    ${ArticleDigest.Sidebar.fragments.article}
  `
}

const ResponseArticle = ({ hasCover, article }: ResponseArticleProps) => {
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
          <Translate zh_hant="關聯了本作品" zh_hans="关联了本作品" />
        </span>
      </header>

      <section className="article-digest">
        <ArticleDigest.Sidebar
          article={article}
          hasCover={hasCover}
          hasBackground
        />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ResponseArticle.fragments = fragments

export default ResponseArticle
