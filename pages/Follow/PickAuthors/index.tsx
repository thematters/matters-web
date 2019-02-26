import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  Error,
  Head,
  PageHeader,
  ShuffleButton,
  Spinner,
  Translate,
  UserDigest
} from '~/components'

import IMAGE_ILLUSTRATION_AVATAR from '~/static/images/illustration-avatar.svg'

import { FolloweeCountViewer } from './__generated__/FolloweeCountViewer'
import { PickAuthors as PickAuthorsType } from './__generated__/PickAuthors'
import styles from './styles.css'

const PICK_AUTHORS = gql`
  query PickAuthors {
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
  ${UserDigest.FullDesc.fragments.user}
`

const PickIntroHeader = () => {
  return (
    <header>
      <img
        className="avatar"
        src={IMAGE_ILLUSTRATION_AVATAR}
        aria-hidden="true"
      />
      <section className="intro">
        <p>
          <Translate
            zh_hant="歡迎加入 Matters，一個自由、自主、永續的創作與公共討論空間。"
            zh_hans="欢迎加入 Matters，一个自由、自主、永续的创作与公共讨论空间。"
          />
        </p>
        <p className="sub">
          <Translate zh_hant="請追蹤至少 " zh_hans="请追踪至少 " />
          <span className="hightlight">5</span>
          <Translate
            zh_hant=" 位創作者，以開啓你的個性化訂閱時間線。"
            zh_hans=" 位创作者，以开启你的个性化订阅时间线。"
          />
        </p>
      </section>
      <style jsx>{styles}</style>
    </header>
  )
}

const PickAuthors = ({ viewer }: { viewer: FolloweeCountViewer }) => (
  <Query query={PICK_AUTHORS} notifyOnNetworkStatusChange>
    {({
      data,
      loading,
      error,
      refetch
    }: QueryResult & { data: PickAuthorsType }) => {
      if (error) {
        return <Error error={error} />
      }

      const edges = _get(data, 'viewer.recommendation.authors.edges', [])
      const followeeCount = _get(viewer, 'followees.totalCount', 0)

      if (edges.length <= 0) {
        return null
      }

      return (
        <>
          <Head title={{ zh_hant: '追蹤創作者', zh_hans: '追踪创作者' }} />

          <PickIntroHeader />
          <PageHeader
            pageTitle={<Translate zh_hant="追蹤創作者" zh_hans="追踪创作者" />}
          >
            <div className="follow-info">
              <ShuffleButton onClick={() => refetch()} />
              <span>
                <Translate zh_hant="已追蹤 " zh_hans="已追踪 " />
                <span className="hightlight">{followeeCount}</span>
                <Translate zh_hant=" 位" zh_hans=" 位" />
              </span>
            </div>
          </PageHeader>

          {loading && <Spinner />}

          {!loading && (
            <ul>
              {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <UserDigest.FullDesc user={node} nameSize="small" />
                </li>
              ))}
            </ul>
          )}
          <style jsx>{styles}</style>
        </>
      )
    }}
  </Query>
)

PickAuthors.fragments = {
  followeeCount: gql`
    fragment FolloweeCountViewer on User {
      followees(input: { first: 0 }) {
        totalCount
      }
    }
  `
}

export default PickAuthors
