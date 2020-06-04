import gql from 'graphql-tag'

import {
  BookmarkButton,
  ReCaptchaProvider,
  ShareButton,
  useResponsive,
} from '~/components'
import DropdownActions from '~/components/ArticleDigest/DropdownActions'

import AppreciationButton from '../AppreciationButton'
import Appreciators from './Appreciators'
import CommentBar from './CommentBar'
import styles from './styles.css'

import { ToolbarArticlePrivate } from './__generated__/ToolbarArticlePrivate'
import { ToolbarArticlePublic } from './__generated__/ToolbarArticlePublic'

interface ToolbarProps {
  article: ToolbarArticlePublic & Partial<ToolbarArticlePrivate>
}

const fragments = {
  article: {
    public: gql`
      fragment ToolbarArticlePublic on Article {
        id
        ...AppreciatorsArticle
        ...DropdownActionsArticle
        ...AppreciationButtonArticlePublic
        ...CommentBarArticlePublic
      }
      ${Appreciators.fragments.article}
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

const Toolbar = ({ article }: ToolbarProps) => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <section className="toolbar">
      <ReCaptchaProvider action="appreciateArticle">
        <section className="appreciate-button">
          <AppreciationButton article={article} />
          {isSmallUp && <Appreciators article={article} />}
        </section>
      </ReCaptchaProvider>

      <section className="comment-bar">
        <CommentBar article={article} />
      </section>

      <section className="buttons">
        <BookmarkButton article={article} size="md-s" inCard={false} />
        <ShareButton iconSize="md-s" inCard={false} />
        <DropdownActions
          article={article}
          color="black"
          size="md-s"
          inCard={false}
        />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Toolbar.fragments = fragments

export default Toolbar
