import gql from 'graphql-tag'
import { useState } from 'react'

import FeedComment from '~/components/Comment/FeedComment'

import { filterComments } from '~/common/utils'

import ExpandButton from './ExpandButton'
import styles from './styles.css'

import { DescendantsIncludedCommentComment } from './__generated__/DescendantsIncludedCommentComment'

const COLLAPSE_COUNT = 2

interface DescendantsIncludedCommentControls {
  defaultExpand?: boolean
  hasLink?: boolean
}

type DescendantsIncludedCommentProps = {
  comment: DescendantsIncludedCommentComment
} & DescendantsIncludedCommentControls

const fragments = {
  comment: gql`
    fragment DescendantsIncludedCommentComment on Comment {
      id
      ...FeedCommentComment
      comments(input: { sort: oldest, first: null }) {
        edges {
          cursor
          node {
            ...FeedCommentComment
          }
        }
      }
    }

    ${FeedComment.fragments.comment}
  `
}

const DescendantsIncludedComment = ({
  comment,
  defaultExpand,
  hasLink
}: DescendantsIncludedCommentProps) => {
  const descendants = filterComments(
    (comment.comments?.edges || []).map(({ node }) => node)
  ) as DescendantsIncludedCommentComment[]
  const restCount = descendants.length - COLLAPSE_COUNT
  const [expand, setExpand] = useState(defaultExpand || restCount <= 0)

  return (
    <section className="container">
      <FeedComment comment={comment} hasReply hasLink={hasLink} />

      {descendants.length > 0 && (
        <ul className="descendants">
          {descendants
            .slice(0, expand ? undefined : COLLAPSE_COUNT)
            .map(descendantComment => (
              <li key={descendantComment.id}>
                <FeedComment
                  comment={descendantComment}
                  hasReply
                  hasLink={hasLink}
                />
              </li>
            ))}

          {!expand && (
            <ExpandButton
              onClick={() => setExpand(true)}
              restCount={restCount}
            />
          )}
        </ul>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

DescendantsIncludedComment.fragments = fragments

export default DescendantsIncludedComment
