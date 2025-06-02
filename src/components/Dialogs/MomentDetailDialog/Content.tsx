import { useQuery } from '@apollo/client'
import { Editor } from '@matters/matters-editor'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import {
  ADD_MOMENT_COMMENT_MENTION,
  DISABLE_SUSPEND_DISMISS_ON_ESC,
  ENABLE_SUSPEND_DISMISS_ON_ESC,
  MAX_META_SUMMARY_LENGTH,
} from '~/common/enums'
import { MOMENT_DIGEST_REFERRER } from '~/common/enums/moment'
import {
  captureClicks,
  makeMentionElement,
  makeSummary,
  sessionStorage,
  stripHtml,
  toPath,
} from '~/common/utils'
import {
  BackToHomeButton,
  Error,
  Head,
  MomentDigestDetail,
  QueryError,
  useEventListener,
  useRoute,
} from '~/components'
import MomentCommentForm from '~/components/Forms/MomentCommentForm'
import Assets from '~/components/MomentDigest/Assets'
import LikeButton from '~/components/MomentDigest/FooterActions/LikeButton'
import { MomentDetailQuery, MomentState } from '~/gql/graphql'

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
  const intl = useIntl()
  const { isInPath, router } = useRoute()
  const [editing, setEditing] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  const isInMomentDetailPage = isInPath('MOMENT_DETAIL')
  /**
   * Data Fetching
   */
  const { data, loading, error } = useQuery<MomentDetailQuery>(MOMENT_DETAIL, {
    variables: { shortHash },
  })

  useEffect(() => {
    if (editor && editing) {
      editor.commands.focus('end')
    }

    if (editing) {
      window.dispatchEvent(new CustomEvent(ENABLE_SUSPEND_DISMISS_ON_ESC))
    } else {
      window.dispatchEvent(new CustomEvent(DISABLE_SUSPEND_DISMISS_ON_ESC))
    }
  }, [editor, editing])

  useEventListener(
    ADD_MOMENT_COMMENT_MENTION,
    (payload: {
      author: { id: string; userName: string; displayName: string }
    }) => {
      setEditing(true)
      const author = payload?.author
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
    return (
      <section className={styles.error}>
        <QueryError error={error} />
      </section>
    )
  }

  if (
    data?.moment?.__typename !== 'Moment' ||
    data.moment.state === MomentState.Archived
  ) {
    return (
      <section className={styles.error}>
        <Error type="not_found">
          <BackToHomeButton />
        </Error>
      </section>
    )
  }

  const moment = data.moment

  const { content, assets } = moment

  const footerClassName = classNames({
    [styles.footer]: true,
    [styles.editing]: editing,
  })

  const closeDialog = () => {
    const momentDigestReferrer = sessionStorage.get(MOMENT_DIGEST_REFERRER)
    if (isInMomentDetailPage && momentDigestReferrer) {
      window.history.back()
    }

    if (isInMomentDetailPage && !momentDigestReferrer) {
      const userProfilePath = toPath({
        page: 'userProfile',
        userName: moment.author.userName || '',
      })
      router.push(userProfilePath.href)
    }
    _closeDialog()
  }

  return (
    <>
      <Head
        title={`${
          moment.content && stripHtml(moment.content)
            ? makeSummary(moment.content, MAX_META_SUMMARY_LENGTH)
            : intl.formatMessage({
                defaultMessage: 'Moment',
                description:
                  'src/components/Dialogs/MomentDetailDialog/Content.tsx',
                id: 'g/IDCs',
              })
        } - ${moment.author.displayName}`}
        description={''}
        image={moment.assets?.[0]?.path}
      />

      <section className={styles.container}>
        <header className={styles.header}>
          <MomentDigestDetail
            moment={moment}
            onClose={closeDialog}
            hasContent={false}
            hasAssets={false}
          />
        </header>

        <section className={styles.mainContent}>
          {!!content && (
            <section
              className="u-content-moment detail"
              dangerouslySetInnerHTML={{
                __html: content || '',
              }}
              onClick={captureClicks}
            />
          )}
          {assets && assets.length > 0 && (
            <section className={styles.assets}>
              <Assets moment={moment} />
            </section>
          )}
        </section>

        <Comments moment={moment} editing={editing} />

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
    </>
  )
}

export default MomentDetailDialogContent
