import { PureQueryOptions } from 'apollo-client'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Translate } from '~/components'

import { ViewerDrafts } from './__generated__/ViewerDrafts'

const DELETE_DRAFT = gql`
  mutation DeleteDraft($id: ID!) {
    deleteDraft(input: { id: $id })
  }
`

const VIEWER_DRADTS = gql`
  query ViewerDrafts {
    viewer {
      id
      drafts(input: { first: 10 }) {
        edges {
          cursor
          node {
            id
          }
        }
      }
    }
  }
`

const DeleteButton = ({
  id,
  refetchQueries
}: {
  id: string
  refetchQueries?: PureQueryOptions[]
}) => {
  return (
    <Mutation
      mutation={DELETE_DRAFT}
      variables={{ id }}
      update={cache => {
        try {
          const data = cache.readQuery<ViewerDrafts>({ query: VIEWER_DRADTS })

          if (
            !data ||
            !data.viewer ||
            !data.viewer.drafts ||
            !data.viewer.drafts.edges
          ) {
            return
          }

          const edges = data.viewer.drafts.edges.filter(
            ({ node }: { node: any }) => node.id !== id
          )
          data.viewer.drafts.edges = edges
          cache.writeQuery({
            query: VIEWER_DRADTS,
            data
          })
        } catch (e) {
          //
          console.log(e)
        }
      }}
    >
      {deleteDraft => (
        <button type="button" onClick={() => deleteDraft({ refetchQueries })}>
          <Translate zh_hant="刪除" zh_hans="删除" />
        </button>
      )}
    </Mutation>
  )
}

export default DeleteButton
