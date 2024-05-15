import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEST_ID,
  TOOLBAR_FIXEDTOOLBAR_ID,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { toLocale, toPath } from '~/common/utils'
import {
  BookmarkButton,
  ButtonProps,
  CommentFormBetaDialog,
  ViewerContext,
} from '~/components'
import DropdownActions, {
  DropdownActionsControls,
} from '~/components/ArticleDigest/DropdownActions'
import {
  ArticleDetailPublicQuery,
  FixedToolbarArticlePrivateFragment,
  FixedToolbarArticlePublicFragment,
} from '~/gql/graphql'

import AppreciationButton from '../../AppreciationButton'
import CommentButton from '../Button/CommentButton'
import DonationButton from '../Button/DonationButton'
import styles from './styles.module.css'

export type FixedToolbarProps = {
  article: FixedToolbarArticlePublicFragment &
    Partial<FixedToolbarArticlePrivateFragment>
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  translatedLanguage?: string | null
  privateFetched: boolean
  lock: boolean
  showCommentToolbar: boolean
  openCommentsDialog?: () => void
} & DropdownActionsControls

const fragments = {
  article: {
    public: gql`
      fragment FixedToolbarArticlePublic on Article {
        id
        title
        tags {
          content
        }
        ...DropdownActionsArticle
        ...DonationButtonArticle
        ...AppreciationButtonArticlePublic
        ...CommentButtonArticlePublic
      }
      ${DonationButton.fragments.article}
      ${DropdownActions.fragments.article}
      ${AppreciationButton.fragments.article.public}
      ${CommentButton.fragments.article.public}
    `,
    private: gql`
      fragment FixedToolbarArticlePrivate on Article {
        id
        ...BookmarkArticlePrivate
        ...AppreciationButtonArticlePrivate
        ...CommentButtonArticlePrivate
      }
      ${AppreciationButton.fragments.article.private}
      ${BookmarkButton.fragments.article.private}
      ${CommentButton.fragments.article.private}
    `,
  },
}

const FixedToolbar = ({
  article,
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
  const path = toPath({ page: 'articleDetail', article })
  const sharePath =
    translated && translatedLanguage
      ? `${path.href}?locale=${toLocale(translatedLanguage)}`
      : path.href

  const isAuthor = viewer.id === article.author.id

  const dropdonwActionsProps: DropdownActionsControls = {
    size: 24,
    inCard: true,
    sharePath,
    hasExtend: false,
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
      <CommentFormBetaDialog articleId={article.id} type="article">
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
              article={article}
              privateFetched={privateFetched}
              iconSize={24}
              textWeight="normal"
              textIconSpacing={4}
              disabled={lock}
              {...buttonProps}
            />

            {!showCommentToolbar && (
              <CommentButton
                article={article}
                disabled={!article.canComment}
                iconSize={24}
                textWeight="normal"
                textIconSpacing={4}
                onClick={() => {
                  if (!viewer.isAuthed && article.commentCount === 0) {
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
              article={article}
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

FixedToolbar.fragments = fragments

export default FixedToolbar
