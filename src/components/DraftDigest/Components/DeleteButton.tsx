import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Mutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'

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
  return (
    <Mutation
      mutation={DELETE_DRAFT}
      variables={{ id }}
      update={(cache: any) => {
        try {
          const data = cache.readQuery({ query: ME_DRADTS })

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
      }}
    >
      {(deleteDraft: any) => (
        <button type="button" onClick={() => deleteDraft()}>
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
