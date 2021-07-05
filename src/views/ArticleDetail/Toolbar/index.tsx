import gql from 'graphql-tag'

import {
  BookmarkButton,
  ReCaptchaProvider,
  ShareButton,
  useResponsive,
} from '~/components'
import DropdownActions, {
  DropdownActionsControls,
} from '~/components/ArticleDigest/DropdownActions'

import AppreciationButton from '../AppreciationButton'
import Appreciators from './Appreciators'
import CommentBar from './CommentBar'
import DonationButton from './DonationButton'
import styles from './styles.css'

import { ToolbarArticlePrivate } from './__generated__/ToolbarArticlePrivate'
import { ToolbarArticlePublic } from './__generated__/ToolbarArticlePublic'

export type ToolbarProps = {
  article: ToolbarArticlePublic & Partial<ToolbarArticlePrivate>
  privateFetched: boolean
  lock: boolean
} & DropdownActionsControls

const fragments = {
  article: {
    public: gql`
      fragment ToolbarArticlePublic on Article {
        id
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

const Toolbar = ({ article, privateFetched, lock, ...props }: ToolbarProps) => {
  const isSmallUp = useResponsive('sm-up')

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

        <DonationButton article={article} disabled={lock} />

        <section className="comment-bar">
          <CommentBar article={article} disabled={lock} />
        </section>

        <BookmarkButton article={article} size="md-s" inCard={false} />

        {isSmallUp && <ShareButton iconSize="md-s" inCard={false} />}

        <DropdownActions
          article={article}
          size="md-s"
          inCard={false}
          hasShare={!isSmallUp}
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
