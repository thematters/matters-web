import { gql, useQuery } from '@apollo/client'
import _uniq from 'lodash/uniq'

import { ArticleDigestDropdown, Spinner } from '~/components'
import SidebarCollection from '~/components/Editor/Sidebar/Collection'
import { QueryError, useMutation } from '~/components/GQL'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DraftCollectionQuery } from './__generated__/DraftCollectionQuery'
import { EditCollectionDraft } from './__generated__/EditCollectionDraft'
import { SetDraftCollection } from './__generated__/SetDraftCollection'

const fragments = {
  draft: gql`
    fragment EditCollectionDraft on Draft {
      id
      publishState
      collection(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

const DRAFT_COLLECTION = gql`
  query DraftCollectionQuery($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        collection(input: { first: null }) {
          edges {
            node {
              ...ArticleDigestDropdownArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`

const SET_DRAFT_COLLECTION = gql`
  mutation SetDraftCollection($id: ID!, $collection: [ID]) {
    putDraft(input: { id: $id, collection: $collection }) {
      id
      collection(input: { first: null }) {
        edges {
          node {
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`

interface EditCollectionProps {
  draft: EditCollectionDraft
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void
}

const EditCollection = ({ draft, setSaveStatus }: EditCollectionProps) => {
  const draftId = draft.id
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  const handleCollectionChange = async (
    articles: ArticleDigestDropdownArticle[]
  ) => {
    setSaveStatus('saving')
    try {
      await setCollection({
        variables: {
          id: draft.id,
          collection: _uniq(articles.map(({ id }) => id)),
        },
      })
      setSaveStatus('saved')
    } catch (e) {
      setSaveStatus('saveFailed')
    }
  }

  const [setCollection] = useMutation<SetDraftCollection>(SET_DRAFT_COLLECTION)
  const { data, loading, error } = useQuery<DraftCollectionQuery>(
    DRAFT_COLLECTION,
    {
      variables: { id: draftId },
    }
  )
  const edges =
    data &&
    data.node &&
    data.node.__typename === 'Draft' &&
    data.node.collection &&
    data.node.collection.edges

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <SidebarCollection
      articles={(edges && edges.map(({ node }) => node)) || []}
      onEdit={handleCollectionChange}
      disabled={isPending || isPublished}
    />
  )
}

EditCollection.fragments = fragments

export default EditCollection
