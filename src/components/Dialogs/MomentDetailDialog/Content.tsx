import { useQuery } from '@apollo/react-hooks'
import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import { ADD_MOMENT_COMMENT_MENTION } from '~/common/enums'
import { makeMentionElement, toPath } from '~/common/utils'
import {
  MomentDigestDetail,
  QueryError,
  useEventListener,
  useRoute,
  ViewerContext,
} from '~/components'
import MomentCommentForm from '~/components/Forms/MomentCommentForm'
import Assets from '~/components/MomentDigest/Assets'
import LikeButton from '~/components/MomentDigest/FooterActions/LikeButton'
import { MomentDetailQuery } from '~/gql/graphql'

import Comments from './Comments'
import { MOMENT_DETAIL } from './gql'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

interface MomentDetailDialogContentProps {
  shortHash: string
  closeDialog: () => void
}

const MomentDetailDialogContent = ({
  shortHash,
  closeDialog: _closeDialog,
}: MomentDetailDialogContentProps) => {
  const viewer = useContext(ViewerContext)
  const { isInPath, router } = useRoute()
  const [editing, setEditing] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  const isInMomentDetailPage = isInPath('MOMENT_DETAIL')
  /**
   * Data Fetching
   */
  const { data, loading, error } = useQuery<MomentDetailQuery>(MOMENT_DETAIL, {
    variables: {
      shortHash,
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

  /**
   * Render
   */
  if (loading && !data) {
    return <Placeholder onClose={_closeDialog} />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (data?.moment?.__typename !== 'Moment') {
    return null
  }

  const moment = data.moment

  const { content, assets } = moment

  const footerClassName = classNames({
    [styles.footer]: true,
    [styles.editing]: editing,
  })

  const closeDialog = () => {
    const isFirstPageVisit = window.history.length <= 1
    if (isInMomentDetailPage && isFirstPageVisit) {
      const userProfilePath = toPath({
        page: 'userProfile',
        userName: moment.author.userName || '',
      })
      router.push(userProfilePath.href)
    }
    if (isInMomentDetailPage && !isFirstPageVisit) {
      window.history.back()
    }
    _closeDialog()
  }

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
          {assets && assets.length > 0 && (
            <section className={styles.assets}>
              <Assets moment={moment} />
            </section>
          )}
        </section>
        <Comments moment={moment} />
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
          moment={moment}
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
