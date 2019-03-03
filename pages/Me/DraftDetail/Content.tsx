import gql from 'graphql-tag'
import { SFC, useEffect, useState } from 'react'
import { Mutation } from 'react-apollo'

import { Placeholder } from '~/components/Placeholder'

import { DraftDetailQuery_node_Draft } from './__generated__/DraftDetailQuery'
import { UpdateDraftVariables } from './__generated__/UpdateDraft'

export const UPDATE_DRAFT = gql`
  mutation UpdateDraft(
    $id: ID!
    $title: String!
    $content: String!
    $coverAssetId: ID
  ) {
    putDraft(
      input: {
        id: $id
        title: $title
        content: $content
        coverAssetId: $coverAssetId
      }
    ) {
      id
      slug
    }
  }
`

const DraftContent: React.FC<{ draft: DraftDetailQuery_node_Draft }> = ({
  draft
}) => {
  // return placeholder on SSR
  const [Editor, setEditor] = useState(
    () =>
      Placeholder.ArticleDetail as SFC<{
        draft: DraftDetailQuery_node_Draft
        upload: any
        submit: any
      }>
  )

  // use real editor on client side
  useEffect(() => {
    if (process.browser) {
      const EditorComponent = require('~/components/Editor')
      setEditor(() => EditorComponent.Editor)
    }
  })

  const upload = (uploadata: any) => {
    console.log('upload', uploadata)
    return Promise.resolve({
      data: { singleFileUpload: { id: 'test', path: 'test' } }
    })
  }

  return (
    <Mutation mutation={UPDATE_DRAFT}>
      {updateDraft => (
        <Editor
          draft={draft}
          upload={upload}
          submit={(newDraft: UpdateDraftVariables) => {
            updateDraft({ variables: newDraft })
          }}
        />
      )}
    </Mutation>
  )
}

export default DraftContent
