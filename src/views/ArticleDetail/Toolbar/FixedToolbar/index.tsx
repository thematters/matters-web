import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toLocale, toPath } from '~/common/utils'
import {
  BookmarkButton,
  Button,
  ButtonProps,
  ReCaptchaProvider,
  TextIcon,
  toast,
} from '~/components'
import DropdownActions, {
  DropdownActionsControls,
} from '~/components/ArticleDigest/DropdownActions'
import {
  ArticleDetailPublicQuery,
  ToolbarArticlePrivateFragment,
  ToolbarArticlePublicFragment,
} from '~/gql/graphql'

import AppreciationButton from '../../AppreciationButton'
import CommentButton from '../CommentButton'
import DonationButton from '../DonationButton'
import styles from './styles.module.css'

export type FixedToolbarProps = {
  article: ToolbarArticlePublicFragment & Partial<ToolbarArticlePrivateFragment>
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  translatedLanguage?: string | null
  privateFetched: boolean
  lock: boolean
  showCommentToolbar: boolean
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
  ...props
}: FixedToolbarProps) => {
  const path = toPath({ page: 'articleDetail', article })
  const sharePath =
    translated && translatedLanguage
      ? `${path.href}?locale=${toLocale(translatedLanguage)}`
      : path.href

  const dropdonwActionsProps: DropdownActionsControls = {
    size: 'md',
    inCard: false,
    inFixedToolbar: true,
    sharePath,
    hasExtend: false,
    hasEdit: true,
    hasArchive: true,
    hasAddCollection: true,
    ...props,
  }

  const buttonProps: ButtonProps = {
    spacing: ['baseTight', 'baseTight'],
    bgColor: 'white',
    borderRadius: 0,
  }

  return (
    <section className={styles.toolbar} data-test-id={TEST_ID.ARTICLE_TOOLBAR}>
      <section className={styles.buttons}>
        {showCommentToolbar && (
          <Button
            bgColor="greyLighter"
            borderRadius="0.5rem"
            textColor="greyDarker"
            spacing={['baseTight', 'baseTight']}
            onClick={() => {
              // TODO: open comment drawer
              toast.success({
                message: '功能即將開放，敬請期待！',
              })
            }}
            disabled={lock}
          >
            <TextIcon size="sm">
              <FormattedMessage
                defaultMessage="Comment..."
                id="YOMY1y"
                description="src/views/ArticleDetail/Toolbar/FixedToolbar/index.tsx"
              />
            </TextIcon>
          </Button>
        )}

        <ReCaptchaProvider action="appreciateArticle">
          <AppreciationButton
            article={article}
            showText={showCommentToolbar}
            privateFetched={privateFetched}
            iconSize="md"
            textWeight="normal"
            textIconSpacing="xxtight"
            disabled={lock}
            {...buttonProps}
          />
        </ReCaptchaProvider>

        <DonationButton
          article={article}
          articleDetail={articleDetails}
          showText={showCommentToolbar}
          disabled={lock}
          iconSize="md"
          textWeight="normal"
          textIconSpacing="xxtight"
          {...buttonProps}
        />

        {!showCommentToolbar && (
          <CommentButton
            article={article}
            disabled={!article.canComment}
            iconSize="md"
            textWeight="normal"
            textIconSpacing="xxtight"
            onClick={() => {
              toast.success({
                message: '功能即將開放，敬請期待！',
              })
            }}
            {...buttonProps}
          />
        )}

        <BookmarkButton
          article={article}
          iconSize="md"
          inCard={false}
          disabled={lock}
          showText={showCommentToolbar}
          {...buttonProps}
        />

        {!showCommentToolbar && (
          <DropdownActions
            article={article}
            disabled={lock}
            {...dropdonwActionsProps}
            hasShare
            hasBookmark={false}
          />
        )}
      </section>
    </section>
  )
}

FixedToolbar.fragments = fragments

export default FixedToolbar
