import gql from 'graphql-tag'
import _filter from 'lodash/filter'
import _get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { IconUnSelected20, Menu, toast, useMutation } from '~/components'
import {
  SetTagUnselectedButtonArticleFragment,
  SetTagUnselectedMutation,
  TagArticlesPublicQuery,
} from '~/gql/graphql'

const SET_TAG_UNSELECTED = gql`
  mutation SetTagUnselected($id: ID!, $articles: [ID!]) {
    updateArticlesTags(
      input: { id: $id, articles: $articles, isSelected: false }
    ) {
      id
      articles(input: { first: 0, selected: true }) {
        totalCount
      }
    }
  }
`

const fragments = {
  article: gql`
    fragment SetTagUnselectedButtonArticle on Article {
      id
      tags {
        id
        creator {
          id
        }
        editors {
          id
        }
      }
    }
  `,
}

const SetTagUnselectedButton = ({
  article,
  tagId,
}: {
  article: SetTagUnselectedButtonArticleFragment
  tagId: string
}) => {
  const [update] = useMutation<SetTagUnselectedMutation>(SET_TAG_UNSELECTED, {
    variables: { id: tagId, articles: [article.id] },
    update: (cache) => {
      try {
        // FIXME: circular dependencies
        const {
          TAG_ARTICLES_PUBLIC: query,
        } = require('~/components/GQL/queries/tagArticles')
        const variables = {
          id: tagId,
          selected: true,
          sortBy: 'byCreatedAtDesc',
        }
        const data = cache.readQuery<TagArticlesPublicQuery>({
          query,
          variables,
        })
        const node = _get(data, 'node')
        const articles = node?.__typename === 'Tag' ? node?.articles : null

        if (!articles || !articles?.edges || articles?.edges?.length === 0) {
          return
        }

        const newEdges = articles.edges.filter(
          (item) => item.node.id !== article.id
        )
        cache.writeQuery({
          query,
          variables,
          data: {
            node: {
              ...node,
              articles: {
                ...articles,
                edges: newEdges,
              },
            },
          },
        })
        sync()
      } catch (error) {
        console.error(error)
      }
    },
  })

  const sync = () => {
    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="This article has been removed from Trending"
          description="src/components/ArticleDigest/DropdownActions/SetTagUnselectedButton.tsx"
        />
      ),
    })
  }

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Unpin from Trending"
          description="src/components/ArticleDigest/DropdownActions/SetTagUnselectedButton.tsx"
        />
      }
      icon={<IconUnSelected20 size="mdS" />}
      onClick={async () => {
        await update()
      }}
    />
  )
}

SetTagUnselectedButton.fragments = fragments

export default SetTagUnselectedButton
