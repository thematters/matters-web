import gql from 'graphql-tag'

import { TEST_ID } from '@/src/common/enums'
import { normalizeTag, toLocale, toPath } from '~/common/utils'
import {
  BookmarkButton,
  Media,
  ReCaptchaProvider,
  ShareButton,
} from '~/components'
import DropdownActions, {
  DropdownActionsControls,
} from '~/components/ArticleDigest/DropdownActions'
import {
  ArticleDetailPublicQuery,
  ToolbarArticlePrivateFragment,
  ToolbarArticlePublicFragment,
} from '~/gql/graphql'

import AppreciationButton from '../AppreciationButton'
import CommentBar from './CommentBar'
import DonationButton from './DonationButton'
import styles from './styles.css'

export type ToolbarProps = {
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
      fragment ToolbarArticlePublic on Article {
        id
        title
        tags {
          content
        }
        ...DropdownActionsArticle
        ...DonationButtonArticle
        ...AppreciationButtonArticlePublic
        ...CommentBarArticlePublic
      }
      ${DonationButton.fragments.article}
      ${DropdownActions.fragments.article}
      ${AppreciationButton.fragments.article.public}
      ${CommentBar.fragments.article.public}
    `,
    private: gql`
      fragment ToolbarArticlePrivate on Article {
        id
        ...BookmarkArticlePrivate
        ...AppreciationButtonArticlePrivate
        ...CommentBarArticlePrivate
      }
      ${AppreciationButton.fragments.article.private}
      ${BookmarkButton.fragments.article.private}
      ${CommentBar.fragments.article.private}
    `,
  },
}

const Toolbar = ({
  article,
  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  lock,
  ...props
}: ToolbarProps) => {
  const path = toPath({ page: 'articleDetail', article })
  const sharePath =
    translated && translatedLanguage
      ? `/${toLocale(translatedLanguage)}${path.href}`
      : path.href

  const dropdonwActionsProps: DropdownActionsControls = {
    size: 'md-s',
    inCard: false,
    sharePath,
    hasExtend: !lock,
    ...props,
  }

  return (
    <section className="toolbar" data-test-id={TEST_ID.ARTICLE_TOOLBAR}>
      <section className="buttons">
        <ReCaptchaProvider action="appreciateArticle">
          <AppreciationButton
            article={article}
            privateFetched={privateFetched}
            disabled={lock}
          />
        </ReCaptchaProvider>

        <DonationButton
          article={article}
          disabled={lock}
          articleDetail={articleDetails}
        />

        <section className="comment-bar">
          <CommentBar
            article={article}
            disabled={lock || !article.canComment}
          />
        </section>

        <BookmarkButton article={article} size="md-s" inCard={false} />

        <Media greaterThan="sm">
          <ShareButton
            iconSize="md-s"
            inCard={false}
            // title={makeTitle(article.title)}
            path={sharePath}
            tags={article.tags
              ?.map(({ content }) => content)
              .join(' ')
              .split(/\s+/)
              .map(normalizeTag)}
          />
        </Media>

        <Media at="sm">
          <DropdownActions
            article={article}
            {...dropdonwActionsProps}
            hasShare
          />
        </Media>
        <Media greaterThan="sm">
          <DropdownActions article={article} {...dropdonwActionsProps} />
        </Media>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Toolbar.fragments = fragments

export default Toolbar
