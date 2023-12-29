import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toLocale, toPath } from '~/common/utils'
import { BookmarkButton, ButtonProps, ReCaptchaProvider } from '~/components'
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
        <ReCaptchaProvider action="appreciateArticle">
          <AppreciationButton
            article={article}
            privateFetched={privateFetched}
            iconSize="md"
            textIconSpacing="xxtight"
            {...buttonProps}
          />
        </ReCaptchaProvider>

        <DonationButton
          article={article}
          articleDetail={articleDetails}
          iconSize="md"
          textIconSpacing="xxtight"
          {...buttonProps}
        />

        <CommentButton
          article={article}
          disabled={!article.canComment}
          iconSize="md"
          textIconSpacing="xxtight"
          {...buttonProps}
        />

        <BookmarkButton
          article={article}
          iconSize="md"
          inCard={false}
          {...buttonProps}
        />

        <DropdownActions
          article={article}
          {...dropdonwActionsProps}
          hasShare
          hasBookmark={false}
        />
      </section>
    </section>
  )
}

FixedToolbar.fragments = fragments

export default FixedToolbar
