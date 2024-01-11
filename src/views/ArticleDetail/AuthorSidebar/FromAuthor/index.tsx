import gql from 'graphql-tag'

import {
  ArticleDigestAuthorSidebar,
  ArticleDigestSidebar,
  CollectionDigestAuthorSidebar,
  List,
} from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

type FromAuthorProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

const fragments = {
  article: gql`
    fragment AuthorSidebarFromAuthor on Article {
      id
      author {
        latestWorks {
          id
          title
          cover
          ... on Article {
            ...ArticleDigestSidebarArticle
          }
          ... on Collection {
            ...CollectionDigestAuthorSidebarCollection
          }
        }
      }
    }
    ${ArticleDigestSidebar.fragments.article}
    ${CollectionDigestAuthorSidebar.fragments.collection}
  `,
}

export const FromAuthor = ({ article }: FromAuthorProps) => {
  const latestWorks = article.author?.latestWorks

  if (!latestWorks || latestWorks.length <= 0) {
    return null
  }

  return (
    <section>
      <List borderPosition="top">
        {latestWorks.map((work, i) => (
          <List.Item key={`FromAuthor` + i}>
            {work.__typename === 'Article' && (
              <ArticleDigestAuthorSidebar
                article={work}
                titleColor="black"
                titleTextSize="md"
                imageSize="md"
              />
            )}
            {work.__typename === 'Collection' && (
              <CollectionDigestAuthorSidebar collection={work} />
            )}
          </List.Item>
        ))}
      </List>
    </section>
  )
}

FromAuthor.fragments = fragments
