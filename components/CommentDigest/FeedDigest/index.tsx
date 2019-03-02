import gql from 'graphql-tag'
import _get from 'lodash/get'

import commentFragments from '~/components/GQL/fragments/comment'
import { Label } from '~/components/Label'
import { Translate } from '~/components/Language'
import { UserDigest } from '~/components/UserDigest'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'

import CommentContent from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions, { FooterActionsControls } from '../FooterActions'
import { FeedDigestComment } from './__generated__/FeedDigestComment'
import styles from './styles.css'

const fragments = {
  comment: gql`
    fragment FeedDigestComment on Comment {
      ...BaseDigestComment
      comments(input: { sort: oldest, first: 100 })
        @include(if: $hasDescendantComments) {
        edges {
          cursor
          node {
            ...BaseDigestComment
          }
        }
      }
    }
    ${commentFragments.base}
  `
}

const ReplyTo = ({ user }: any) => (
  <>
    <span className="reply-to">
      <Translate zh_hant="回復" zh_hans="回复" />
    </span>
    <UserDigest.Mini
      user={user}
      avatarSize="xxxsmall"
      textWeight="medium"
      spacing="xxtight"
    />
    <style jsx>{styles}</style>
  </>
)

const PinnedLabel = () => (
  <span className="label">
    <Label size="small">
      <Translate zh_hant="作者推薦" zh_hans="作者推荐" />
    </Label>
    <style jsx>{styles}</style>
  </span>
)

const FeedDigest = ({
  comment,
  ...actionControls
}: { comment: FeedDigestComment } & FooterActionsControls) => {
  const { state, content, author, replyTo, parentComment, pinned } = comment
  const descendantComments = _get(comment, 'comments.edges', []).filter(
    ({ node }: { node: any }) => node.state === 'active'
  )

  return (
    <section className="container">
      <header className="header">
        <div className="avatars">
          <UserDigest.Mini
            user={author}
            avatarSize="small"
            textWeight="medium"
          />
          {replyTo && (!parentComment || replyTo.id !== parentComment.id) && (
            <ReplyTo user={replyTo.author} />
          )}
          {pinned && <PinnedLabel />}
        </div>
        <DropdownActions comment={comment} />
      </header>

      <div className="content-wrap">
        <CommentContent state={state} content={content} />
        <FooterActions comment={comment} {...actionControls} />

        {descendantComments.length > 0 && (
          <ul className="descendant-comments">
            {descendantComments.map(
              ({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <section className="container">
                    <header className="header">
                      <div className="avatars">
                        <UserDigest.Mini
                          user={node.author}
                          avatarSize="xsmall"
                          textWeight="medium"
                        />
                        {node.replyTo &&
                          (!node.parentComment ||
                            node.replyTo.id !== node.parentComment.id) && (
                            <ReplyTo user={node.replyTo.author} />
                          )}
                        {node.pinned && <PinnedLabel />}
                      </div>
                      <DropdownActions comment={node} />
                    </header>

                    <div className="content-wrap">
                      <CommentContent
                        state={node.state}
                        content={node.content}
                      />
                      <FooterActions comment={node} {...actionControls} />
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
