import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'

import Actions, { CommentActionsControls } from '../Actions'
import { FeedDigestComment } from './__generated__/FeedDigestComment'
import styles from './styles.css'

const fragments = {
  comment: gql`
    fragment FeedDigestComment on Comment {
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
}

const FeedDigest = ({
  comment,
  ...actionControls
}: { comment: FeedDigestComment } & CommentActionsControls) => {
  const { content, author } = comment

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
      </div>

      <style jsx>{styles}</style>
      <style jsx>{contentCommentStyles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
