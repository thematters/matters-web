import classNames from 'classnames'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import { PageHeader, ShuffleButton, Spinner, Translate } from '~/components'
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

const AuthorPicker = ({
  viewer,
  title,
  titleIs,
  readonly
}: {
  viewer: FolloweeCountUser
  title: any
  titleIs?: string
  readonly?: boolean
}) => {
  const containerStyle = classNames({
    'small-size-header': titleIs === 'span'
  })

  const { loading, data, refetch } = useQuery<AuthorPickerType>(AUTHOR_PICKER, {
    notifyOnNetworkStatusChange: true
  })
  const edges =
    (data && data.viewer && data.viewer.recommendation.authors.edges) || []
  const followeeCount = viewer.followees.totalCount || 0

  return (
    <div className={containerStyle}>
      <PageHeader pageTitle={title}>
        <div className="follow-info">
          <ShuffleButton onClick={() => refetch()} />
          <span>
            <Translate zh_hant="已追蹤 " zh_hans="已追踪 " />
            <span className="hightlight">{numFormat(followeeCount)}</span>
            <Translate zh_hant=" 位" zh_hans=" 位" />
          </span>
        </div>
      </PageHeader>

      {loading && <Spinner />}

      {!loading && (
        <ul>
          {edges.map(({ node, cursor }) => (
            <li key={cursor}>
              <FullDesc user={node} nameSize="small" readonly={readonly} />
            </li>
          ))}
        </ul>
      )}

      <style jsx>{styles}</style>
    </div>
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

export default AuthorPicker
