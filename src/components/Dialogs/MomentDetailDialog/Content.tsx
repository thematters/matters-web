import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconLikeFill } from '@/public/static/icons/24px/like-fill.svg'
import {
  EmptyComment,
  Icon,
  MomentCommentForm,
  MomentDigestDetail,
  QueryError,
  usePublicQuery,
} from '~/components'
import Assets from '~/components/MomentDigest/Assets'
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
  const [editing, setEditing] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  // Data Fetching
  const { data, loading, error } = usePublicQuery<MomentDetailQuery>(
    MOMENT_DETAIL,
    {
      variables: {
        id: momentId,
      },
      fetchPolicy: 'network-only',
    }
  )

  useEffect(() => {
    if (editor && editing) {
      editor.commands.focus('end')
    }
  }, [editor, editing])

  /**
   * Render
   */
  if (loading && !data) {
    // return <Placeholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (data?.node?.__typename !== 'Moment') {
    return null
  }

  const moment = data.node
  const { content, assets, liked, likeCount } = moment

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
          <EmptyComment
            description={intl.formatMessage({
              defaultMessage: 'No comments',
              description: 'src/components/Forms/MomentCommentForm/index.tsx',
              id: '80bF0W',
            })}
          />
        </section>
      </section>
      <footer className={footerClassName}>
        {!editing && (
          <>
            <div className={styles.likeButton}>
              <button
                onClick={() => {
                  // toggleLike()
                }}
              >
                {liked && (
                  <Icon icon={IconLikeFill} size={22} color="redLight" />
                )}
                {!liked && <Icon icon={IconLike} size={22} />}
              </button>
              {likeCount > 0 && <span>&nbsp;{likeCount}</span>}
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
