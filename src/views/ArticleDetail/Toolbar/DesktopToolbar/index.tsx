import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { normalizeTag, toLocale, toPath } from '~/common/utils'
import { BookmarkButton, ReCaptchaProvider, ShareButton } from '~/components'
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

export type DesktopToolbarProps = {
  article: ToolbarArticlePublicFragment & Partial<ToolbarArticlePrivateFragment>
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  translatedLanguage?: string | null
  privateFetched: boolean
} & DropdownActionsControls

const fragments = {
  article: {
    public: gql`
      fragment DesktopToolbarArticlePublic on Article {
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
      fragment DesktopToolbarArticlePrivate on Article {
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

const DesktopToolbar = ({
  article,
  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  ...props
}: DesktopToolbarProps) => {
  const path = toPath({ page: 'articleDetail', article })
  const sharePath =
    translated && translatedLanguage
      ? `${path.href}?locale=${toLocale(translatedLanguage)}`
      : path.href

  const dropdonwActionsProps: DropdownActionsControls = {
    inCard: false,
    hasEdit: true,
    hasArchive: true,
    hasAddCollection: true,
    hasDonators: false,
    hasExtend: false,
    hasAppreciators: false,
    ...props,
  }

  return (
    <section className={styles.toolbar} data-test-id={TEST_ID.ARTICLE_TOOLBAR}>
      <section className={styles.buttons}>
        <ReCaptchaProvider action="appreciateArticle">
          {/* TODO: confirm can appreciate your own article */}
          <AppreciationButton
            article={article}
            privateFetched={privateFetched}
            hasBorder
            iconSize="md"
          />
        </ReCaptchaProvider>

        <section className={styles.commentBar}>
          <CommentButton
            article={article}
            hasBorder
            disabled={!article.canComment}
            iconSize="md"
          />
        </section>

        <ShareButton
          iconSize="md"
          inCard={false}
          // title={makeTitle(article.title)}
          path={sharePath}
          tags={article.tags
            ?.map(({ content }) => content)
            .join(' ')
            .split(/\s+/)
            .map(normalizeTag)}
        />

        <BookmarkButton article={article} size="md" inCard={false} />

        <DropdownActions
          article={article}
          size="md"
          {...dropdonwActionsProps}
          hasBookmark={false}
        />
      </section>
    </section>
  )
}

DesktopToolbar.fragments = fragments

export default DesktopToolbar
