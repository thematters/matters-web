import gql from 'graphql-tag'

import { stripAllPunct, toLocale, toPath } from '~/common/utils'
import {
  BookmarkButton,
  ReCaptchaProvider,
  ShareButton,
  useResponsive,
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
import Appreciators from './Appreciators'
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
        ...AppreciatorsArticle
        ...DropdownActionsArticle
        ...DonationButtonArticle
        ...AppreciationButtonArticlePublic
        ...CommentBarArticlePublic
      }
      ${Appreciators.fragments.article}
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
  const isSmallUp = useResponsive('sm-up')

  const path = toPath({ page: 'articleDetail', article })
  const sharePath =
    translated && translatedLanguage
      ? `/${toLocale(translatedLanguage)}${path.href}`
      : path.href

  return (
    <section className="toolbar">
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
          <CommentBar article={article} disabled={lock} />
        </section>

        <BookmarkButton article={article} size="md-s" inCard={false} />

        {isSmallUp && (
          <ShareButton
            iconSize="md-s"
            inCard={false}
            // title={makeTitle(article.title)}
            path={sharePath}
            tags={article.tags
              ?.map(({ content }) => content)
              .join(' ')
              .split(/\s+/)
              .map(stripAllPunct)}
          />
        )}

        <DropdownActions
          article={article}
          size="md-s"
          inCard={false}
          hasShare={!isSmallUp}
          sharePath={sharePath}
          hasExtend={!lock}
          {...props}
        />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Toolbar.fragments = fragments

export default Toolbar
