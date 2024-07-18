import { useQuery } from '@apollo/react-hooks'
import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ADD_MOMENT_COMMENT_MENTION,
  MOMENT_COMMENTS_TITLE,
  UPDATE_NEWEST_MOMENT_COMMENT,
} from '~/common/enums'
import { makeMentionElement } from '~/common/utils'
import {
  CommentFeed,
  EmptyComment,
  InfiniteScroll,
  List,
  MomentCommentForm,
  MomentDigestDetail,
  QueryError,
  useEventListener,
  ViewerContext,
} from '~/components'
import Assets from '~/components/MomentDigest/Assets'
import LikeButton from '~/components/MomentDigest/FooterActions/LikeButton'
import { MomentDetailQuery } from '~/gql/graphql'

import { MOMENT_DETAIL } from './gql'
import styles from './styles.module.css'

interface MomentDetailDialogContentProps {
  momentId: string
  closeDialog: () => void
}

const MomentDetailDialogContent = ({
  momentId,
  closeDialog,
}: MomentDetailDialogContentProps) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const [editing, setEditing] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [newestCommentIds, setNewestCommentIds] = useState<string[]>([])
  /**
   * Data Fetching
   */
  const { data, loading, error } = useQuery<MomentDetailQuery>(MOMENT_DETAIL, {
    variables: {
      id: momentId,
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (editor && editing) {
      editor.commands.focus('end')
    }
  }, [editor, editing])

  useEventListener(
    ADD_MOMENT_COMMENT_MENTION,
    (payload: { [key: string]: any }) => {
      setEditing(true)
      const author = payload?.author
      if (author.id === viewer.id) {
        editor && editor.commands.focus('end')
        return
      }
      const mentionElement = makeMentionElement(
        author.id,
        author.userName,
        author.displayName
      )

      if (editor) {
        editor.commands.insertContent(mentionElement)
        editor.commands.focus('end')
      }
    }
  )

  useEventListener(
    UPDATE_NEWEST_MOMENT_COMMENT,
    (payload: { [key: string]: any }) => {
      const comment = payload?.comment
      setNewestCommentIds([comment.id, ...newestCommentIds])
    }
  )

  useEffect(() => {
    if (newestCommentIds.length > 0) {
      const commentTitle = document.getElementById(MOMENT_COMMENTS_TITLE)

      commentTitle?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [newestCommentIds.length])

  /**
   * Render
   */
  if (loading && !data) {
    return null
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (data?.node?.__typename !== 'Moment') {
    return null
  }

  const moment = data.node
  const { content, assets, comments } = moment
  const commentsEdges = comments.edges || []
  const newestComments = commentsEdges
    .filter(({ node }) => newestCommentIds.indexOf(node.id) > -1)
    .reverse()

  const footerClassName = classNames({
    [styles.footer]: true,
    [styles.editing]: editing,
  })

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <MomentDigestDetail
          moment={moment}
          onClose={closeDialog}
          hasContent={false}
          hasAssets={false}
        />
      </header>
      <section className={styles.scrollContainer}>
        <section className={styles.mainContent}>
          {!!content && (
            <section
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content || '',
              }}
            />
          )}
          {assets && assets.length > 0 && <Assets moment={moment} />}
        </section>
        <section className={styles.comments}>
          {commentsEdges.length === 0 && (
            <EmptyComment
              description={intl.formatMessage({
                defaultMessage: 'No comments',
                description: 'src/components/Forms/MomentCommentForm/index.tsx',
                id: '80bF0W',
              })}
            />
          )}
          {commentsEdges.length > 0 && (
            <>
              <section className={styles.title} id={MOMENT_COMMENTS_TITLE}>
                <span>
                  <FormattedMessage defaultMessage="Comment" id="LgbKvU" />
                </span>
                <span className={styles.count}>
                  &nbsp;{commentsEdges.length}
                </span>
              </section>
              <InfiniteScroll
                hasNextPage={false}
                loadMore={async () => {}}
                loader={<></>}
                eof={
                  <FormattedMessage
                    defaultMessage="No more comments"
                    description="src/views/ArticleDetail/Comments/LatestComments/index.tsx"
                    id="9SXN7s"
                  />
                }
                eofSpacingTop="base"
              >
                <List spacing={['loose', 0]} hasBorder={false}>
                  {newestComments &&
                    newestComments.map(({ node }) => (
                      <List.Item key={node.id}>
                        <CommentFeed comment={node} hasReply />
                      </List.Item>
                    ))}
                  {commentsEdges.map(
                    ({ node }) =>
                      newestCommentIds.findIndex((id) => id === node.id) ===
                        -1 &&
                      node.state !== 'archived' && (
                        <List.Item key={node.id}>
                          <CommentFeed comment={node} hasReply />
                        </List.Item>
                      )
                  )}
                </List>
              </InfiniteScroll>
            </>
          )}
        </section>
      </section>
      <footer className={footerClassName}>
        {!editing && (
          <>
            <div className={styles.likeButton}>
              <LikeButton moment={moment} iconSize={22} />
            </div>
          </>
        )}
        <MomentCommentForm
          momentId={momentId}
          setEditor={setEditor}
          editing={editing}
          setEditing={setEditing}
          closeCallback={() => {
            setEditing(false)
          }}
          submitCallback={() => {
            setEditing(false)
          }}
        />
      </footer>
    </section>
  )
}

export default MomentDetailDialogContent
