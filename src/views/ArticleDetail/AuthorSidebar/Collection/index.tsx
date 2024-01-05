import { toPath } from '~/common/utils'
import { LinkWrapper, QueryError, Throw404, usePublicQuery } from '~/components'
import {
  ArticleDetailPublicQuery,
  AuthorSidebarCollectionQuery,
} from '~/gql/graphql'

import { FeedPlaceholder } from '../Placeholder'
import { AUTHOR_SIDEBAR_COLLECTION } from './gql'
import styles from './styles.module.css'

type CollectionProps = {
  collectionId: string
  article: ArticleDetailPublicQuery['article']
}

export const Collection = ({ article, collectionId }: CollectionProps) => {
  /**
   * Data Fetching
   */
  const { data, loading, error } = usePublicQuery<AuthorSidebarCollectionQuery>(
    AUTHOR_SIDEBAR_COLLECTION,
    {
      variables: { id: collectionId },
    }
  )
  const collection = data?.node!

  /**
   * Render
   */
  if (loading) {
    return <FeedPlaceholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!collection || collection.__typename !== 'Collection') {
    return <Throw404 />
  }

  const collectionDetailPath = toPath({
    page: 'collectionDetail',
    userName: article?.author.userName || '',
    collection: {
      id: collection.id,
    },
  })

  return (
    <section className={styles.container}>
      <LinkWrapper {...collectionDetailPath}>
        <title>{collection.title}</title>
      </LinkWrapper>
      {collection.description && (
        <LinkWrapper {...collectionDetailPath}>
          <section className={styles.description}>
            {collection.description}
          </section>
        </LinkWrapper>
      )}
    </section>
  )
}
