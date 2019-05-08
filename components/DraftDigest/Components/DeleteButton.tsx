import { PureQueryOptions } from 'apollo-client'
import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Mutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'

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
      drafts(input: {}) @connection(key: "viewerDrafts") {
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
        }
      }}
    >
      {deleteDraft => (
        <button type="button" onClick={() => deleteDraft({ refetchQueries })}>
          <Translate
            zh_hant={TEXT.zh_hant.delete}
            zh_hans={TEXT.zh_hant.delete}
          />
        </button>
      )}
    </Mutation>
  )
}

export default DeleteButton
