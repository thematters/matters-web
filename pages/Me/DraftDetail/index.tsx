import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import { Placeholder } from '~/components'

import { getQuery } from '~/common/utils'

import { DraftDetailQuery } from './__generated__/DraftDetailQuery'
import styles from './styles.css'

const DRAFT_DETAIL = gql`
  query DraftDetailQuery($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        title
        slug
        content
      }
    }
  }
`

const DraftDetail: React.FC<WithRouterProps> = ({ router }) => {
  const id = getQuery({ router, key: 'id' })

  if (!id) {
    return <span>Empty</span> // TODO
  }

  console.log({ id })

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-0">
        <Query query={DRAFT_DETAIL} variables={{ id }}>
          {({
            data,
            loading,
            error
          }: QueryResult & { data: DraftDetailQuery }) => {
            if (loading) {
              return <Placeholder.ArticleDetail />
            }

            // if (error) {
            //   return <Error error={error} />
            // }
            return <span> hi</span>
          }}
        </Query>
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default withRouter(DraftDetail)
