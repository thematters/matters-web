import { DataProxy } from 'apollo-cache'

// import { CollectionArticlesPublicQuery } from '~/gql/graphql'

const update = ({
  cache,
  collectionId,
  userName,
  type,
}: {
  cache: DataProxy
  collectionId: string
  userName?: string | null
  type: 'delete'
}) => {
  // FIXME: circular dependencies
  // const { COLLECTION_ARTICLES_PUBLIC } = require('~/views/Collection/Articles/gql')

  if (!userName) {
    return
  }

  try {
    // const data = cache.readQuery<CollectionArticlesPublicQuery>({
    //   query: COLLECTION_ARTICLES_PUBLIC,
    //   variables: { userName },
    // })

    if (!data.collection.articles.edges) {
      return
    }

    let edges = data.collection.articles.edges

    switch (type) {
      case 'delete':
        edges = edges.filter(({ node }) => node.id !== collectionId)
        break
    }

    cache.writeQuery({
      query: COLLECTION_ARTICLES_PUBLIC,
      variables: { userName },
      data: {
        collection: {
          ...data.collection,
          articles: {
            ...data.collection.articles,
            edges,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export default update
