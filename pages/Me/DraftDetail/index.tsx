import gql from 'graphql-tag'
import { withRouter, WithRouterProps } from 'next/router'
import { SFC, useEffect, useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { Placeholder } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'

import { getQuery } from '~/common/utils'

import { DraftDetailQuery } from './__generated__/DraftDetailQuery'
import styles from './styles.css'

const DRAFT_DETAIL = gql`
  query DraftDetailQuery($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        ...EditorDraft
      }
    }
  }
  ${EditorFragments.draft}
`

const DraftDetail: React.FC<WithRouterProps> = ({ router }) => {
  const id = getQuery({ router, key: 'id' })

  if (!id) {
    return <span>Empty</span> // TODO
  }

  const [Editor, setEditor] = useState(
    () =>
      Placeholder.ArticleDetail as SFC<{
        draft: DraftDetailQuery['node']
        upload: any
        submit: any
      }>
  )

  useEffect(() => {
    if (process.browser) {
      const EditorComponent = require('~/components/Editor')
      setEditor(() => EditorComponent.Editor)
    }
  })

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-0">
        <Query query={DRAFT_DETAIL} variables={{ id }}>
          {({
            data,
            loading,
            error
          }: QueryResult & { data: DraftDetailQuery }) => {
            console.log(data)
            const draft = data && data.node
            if (loading || !draft) {
              return <Placeholder.ArticleDetail />
            }

            // if (error) {
            //   return <Error error={error} />
            // }

            const upload = (uploadata: any) => {
              console.log('upload', uploadata)
              return Promise.resolve({
                data: { singleFileUpload: { id: 'test', path: 'test' } }
              })
            }

            return (
              <Editor
                draft={draft}
                upload={upload}
                submit={() => {
                  console.log('submit')
                }}
              />
            )
          }}
        </Query>
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default withRouter(DraftDetail)
