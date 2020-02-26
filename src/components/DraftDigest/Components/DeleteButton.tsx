import gql from 'graphql-tag'

import { Button, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { DeleteDraft } from './__generated__/DeleteDraft'
import { ViewerDrafts } from './__generated__/ViewerDrafts'

const DELETE_DRAFT = gql`
  mutation DeleteDraft($id: ID!) {
    deleteDraft(input: { id: $id })
  }
`

const ME_DRADTS = gql`
  query ViewerDrafts {
    viewer {
      id
      drafts(input: { first: null }) @connection(key: "viewerDrafts") {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`

const DeleteButton = ({ id }: { id: string }) => {
  const [deleteDraft] = useMutation<DeleteDraft>(DELETE_DRAFT, {
    variables: { id },
    update: cache => {
      try {
        const data = cache.readQuery<ViewerDrafts>({ query: ME_DRADTS })

        if (
          !data ||
          !data.viewer ||
          !data.viewer.drafts ||
          !data.viewer.drafts.edges
        ) {
          return
        }

        const edges = data.viewer.drafts.edges.filter(
          ({ node }) => node.id !== id
        )

        cache.writeQuery({
          query: ME_DRADTS,
          data: {
            viewer: {
              ...data.viewer,
              drafts: {
                ...data.viewer.drafts,
                edges
              }
            }
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  })

  return (
    <Button onClick={() => deleteDraft()}>
      <TextIcon size="xs">
        <Translate id="delete" />
      </TextIcon>
    </Button>
  )
}

export default DeleteButton
