import gql from 'graphql-tag'
import _get from 'lodash/get'

import { UserDigest } from '~/components/UserDigest'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'

import Actions, { CommentActionsControls } from '../Actions'
import { FeedDigestComment } from './__generated__/FeedDigestComment'
import styles from './styles.css'

const baseCommentFragment = gql`
  fragment BaseDigestComment on Comment {
    id
    content
    author {
      id
      userName
      ...UserDigestMiniUser
    }
    ...DigestActionsComment
  }
  ${UserDigest.Mini.fragments.user}
  ${Actions.fragments.comment}
`

const fragments = {
  comment: gql`
    fragment FeedDigestComment on Comment {
      ...BaseDigestComment
      comments(input: { first: 100 }) @include(if: $hasDescendantComments) {
        edges {
          cursor
          node {
            ...BaseDigestComment
          }
        }
      }
    }
    ${baseCommentFragment}
  `
}

const FeedDigest = ({
  comment,
  ...actionControls
}: { comment: FeedDigestComment } & CommentActionsControls) => {
  const { content, author } = comment
  const descendantComments = _get(comment, 'comments.edges', [])

  return (
    <section className="container">
      <div className="header">
        <UserDigest.Mini user={author} avatarSize="small" textWeight="medium" />
      </div>

      <div className="content-wrap">
        <div
          className="content-comment"
          dangerouslySetInnerHTML={{
            __html: content || ''
          }}
        />
        <Actions comment={comment} {...actionControls} />

        {descendantComments.length > 0 && (
          <ul className="descendant-comments">
            {descendantComments.map(
              ({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <section className="container">
                    <div className="header">
                      <UserDigest.Mini
                        user={node.author}
                        avatarSize="xsmall"
                        textWeight="medium"
                      />
                    </div>

                    <div className="content-wrap">
                      <div
                        className="content-comment"
                        dangerouslySetInnerHTML={{
                          __html: node.content || ''
                        }}
                      />
                      <Actions comment={node} {...actionControls} />
                    </div>
                  </section>
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <style jsx>{styles}</style>
      <style jsx>{contentCommentStyles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
