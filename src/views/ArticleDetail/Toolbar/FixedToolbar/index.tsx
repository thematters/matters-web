import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEST_ID,
  TOOLBAR_FIXEDTOOLBAR_ID,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { toLocale, toPath } from '~/common/utils'
import { ButtonProps, CommentFormBetaDialog, ViewerContext } from '~/components'
import DropdownActions, {
  DropdownActionsControls,
} from '~/components/ArticleDigest/DropdownActions'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import AppreciationButton from '../../AppreciationButton'
import CommentButton from '../Button/CommentButton'
import DonationButton from '../Button/DonationButton'
import styles from './styles.module.css'

export type FixedToolbarProps = {
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  translatedLanguage?: string | null
  privateFetched: boolean
  lock: boolean
  showCommentToolbar: boolean
  openCommentsDialog?: () => void
} & DropdownActionsControls

const FixedToolbar = ({
  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  lock,
  showCommentToolbar,
  openCommentsDialog,
  ...props
}: FixedToolbarProps) => {
  const viewer = useContext(ViewerContext)
  const path = toPath({ page: 'articleDetail', article: articleDetails })
  const sharePath =
    translated && translatedLanguage
      ? `${path.href}?locale=${toLocale(translatedLanguage)}`
      : path.href

  const isAuthor = viewer.id === articleDetails.author.id

  const dropdonwActionsProps: DropdownActionsControls = {
    size: 24,
    inCard: true,
    sharePath,
    hasExtend: false,
    hasIPFS: true,
    hasEdit: true,
    hasArchive: true,
    hasBookmark: true,
    hasAddCollection: true,
    ...props,
  }

  const buttonProps: ButtonProps = {
    spacing: [10, 10],
    bgColor: 'white',
    borderRadius: 0,
  }

  return (
    <section
      className={styles.toolbar}
      data-test-id={TEST_ID.ARTICLE_TOOLBAR}
      id={TOOLBAR_FIXEDTOOLBAR_ID}
    >
      <CommentFormBetaDialog articleId={articleDetails.id} type="article">
        {({ openDialog: openCommentFormBetaDialog }) => (
          <section className={styles.buttons}>
            {showCommentToolbar && (
              <button
                className={styles.commentButton}
                onClick={() => {
                  if (!viewer.isAuthed) {
                    window.dispatchEvent(
                      new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                        detail: {
                          trigger: UNIVERSAL_AUTH_TRIGGER.replyComment,
                        },
                      })
                    )
                    return
                  }

                  openCommentFormBetaDialog()
                }}
                disabled={lock}
              >
                <FormattedMessage
                  defaultMessage="Leave a comment?"
                  id="gK6OxL"
                  description="src/views/ArticleDetail/Toolbar/FixedToolbar/index.tsx"
                />
              </button>
            )}

            <AppreciationButton
              article={articleDetails}
              privateFetched={privateFetched}
              iconSize={24}
              textWeight="normal"
              textIconSpacing={4}
              disabled={lock}
              {...buttonProps}
            />

            {!showCommentToolbar && (
              <CommentButton
                article={articleDetails}
                disabled={!articleDetails.canComment}
                iconSize={24}
                textWeight="normal"
                textIconSpacing={4}
                onClick={() => {
                  if (!viewer.isAuthed && articleDetails.commentCount === 0) {
                    window.dispatchEvent(
                      new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                        detail: {
                          trigger: UNIVERSAL_AUTH_TRIGGER.replyComment,
                        },
                      })
                    )
                    return
                  }

                  if (openCommentsDialog) {
                    openCommentsDialog()
                  } else {
                    openCommentFormBetaDialog()
                  }
                }}
                {...buttonProps}
              />
            )}

            <DonationButton
              articleDetail={articleDetails}
              disabled={lock || isAuthor}
              iconSize={24}
              textWeight="normal"
              textIconSpacing={4}
              {...buttonProps}
            />

            <DropdownActions
              article={articleDetails}
              disabled={lock}
              {...dropdonwActionsProps}
              hasShare
              hasReport
            />
          </section>
        )}
      </CommentFormBetaDialog>
    </section>
  )
}

export default FixedToolbar
