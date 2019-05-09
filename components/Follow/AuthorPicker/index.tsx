import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import { PageHeader, ShuffleButton, Spinner, Translate } from '~/components'
import { Query } from '~/components/GQL'
import FullDesc from '~/components/UserDigest/FullDesc'

import { numFormat } from '~/common/utils'

import { AuthorPicker as AuthorPickerType } from './__generated__/AuthorPicker'
import { FolloweeCountUser } from './__generated__/FolloweeCountUser'
import styles from './styles.css'

const AUTHOR_PICKER = gql`
  query AuthorPicker {
    viewer {
      id
      recommendation {
        authors(input: { first: 5, filter: { random: true } }) {
          edges {
            cursor
            node {
              ...UserDigestFullDescUser
            }
          }
        }
      }
    }
  }
  ${FullDesc.fragments.user}
`

export const AuthorPicker = ({
  viewer,
  title,
  titleIs
}: {
  viewer: FolloweeCountUser
  title: any
  titleIs?: string
}) => {
  const containerStyle = classNames({
    'small-size-header': titleIs === 'span'
  })

  return (
    <Query query={AUTHOR_PICKER} notifyOnNetworkStatusChange>
      {({
        data,
        loading,
        error,
        refetch
      }: QueryResult & { data: AuthorPickerType }) => {
        const edges = _get(data, 'viewer.recommendation.authors.edges', [])
        const followeeCount = _get(viewer, 'followees.totalCount', 0)

        if (!edges || edges.length <= 0) {
          return null
        }

        return (
          <>
            <div className={containerStyle}>
              <PageHeader pageTitle={title}>
                <div className="follow-info">
                  <ShuffleButton onClick={() => refetch()} />
                  <span>
                    <Translate zh_hant="已追蹤 " zh_hans="已追踪 " />
                    <span className="hightlight">
                      {numFormat(followeeCount)}
                    </span>
                    <Translate zh_hant=" 位" zh_hans=" 位" />
                  </span>
                </div>
              </PageHeader>

              {loading && <Spinner />}

              {!loading && (
                <ul>
                  {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <FullDesc user={node} nameSize="small" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <style jsx>{styles}</style>
          </>
        )
      }}
    </Query>
  )
}

AuthorPicker.fragments = {
  user: gql`
    fragment FolloweeCountUser on User {
      followees(input: { first: 0 }) {
        totalCount
      }
    }
  `
}
