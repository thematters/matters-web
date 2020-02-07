import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  List,
  PageHeader,
  ShuffleButton,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import { QueryError } from '~/components/GQL'

import { numFormat } from '~/common/utils'

import styles from './styles.css'

import { AuthorPicker as AuthorPickerType } from './__generated__/AuthorPicker'

const AUTHOR_PICKER = gql`
  query AuthorPicker {
    viewer {
      id
      followees(input: { first: 0 }) {
        totalCount
      }
      recommendation {
        authors(input: { first: 5, filter: { random: true } }) {
          edges {
            cursor
            node {
              ...UserDigestRichUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

export const AuthorPicker = ({
  title,
  titleIs
}: {
  title: React.ReactNode
  titleIs?: string
}) => {
  const containerStyle = classNames({
    'sm-size-header': titleIs === 'span'
  })

  const { loading, data, error, refetch } = useQuery<AuthorPickerType>(
    AUTHOR_PICKER,
    {
      notifyOnNetworkStatusChange: true
    }
  )
  const edges = data?.viewer?.recommendation.authors.edges || []
  const followeeCount = data?.viewer?.followees.totalCount || 0

  return (
    <div className={containerStyle}>
      <PageHeader title={title}>
        <div>
          <ShuffleButton onClick={() => refetch()} />

          <span className="follow-info">
            <Translate zh_hant="已追蹤 " zh_hans="已追踪 " />
            <span className="hightlight">{numFormat(followeeCount)}</span>
            <Translate zh_hant=" 位" zh_hans=" 位" />
          </span>
        </div>
      </PageHeader>

      {loading && <Spinner />}

      {error && <QueryError error={error} />}

      {!loading && (
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <UserDigest.Rich user={node} hasFollow />
            </List.Item>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
    </div>
  )
}
