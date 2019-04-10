import gql from 'graphql-tag'
import _get from 'lodash/get'

import { BookmarkButton } from '~/components/Button/Bookmark'

import { ToolbarArticle } from './__generated__/ToolbarArticle'
import Appreciators from './Appreciators'
import CommentButton from './CommentButton'
import MATButton from './MATButton'
import MoreButton from './MoreButton'
import ShareButton from './ShareButton'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment ToolbarArticle on Article {
      id
      ...MATArticleDetail
      ...AppreciatorsArticle
      ...BookmarkArticle
      ...CommentButtonArticle
      ...MoreButtonArticle
    }
    ${MATButton.fragments.article}
    ${Appreciators.fragments.article}
    ${BookmarkButton.fragments.article}
    ${CommentButton.fragments.article}
    ${MoreButton.fragments.article}
  `
}

const Toolbar = ({
  article,
  placement
}: {
  article: ToolbarArticle
  placement: 'bottom' | 'left'
}) => {
  if (placement === 'left') {
    return (
      <section className="toolbar-left">
        <div className="container">
          <MATButton article={article} />
          <CommentButton article={article} textPlacement="bottom" />
          <BookmarkButton article={article} size="default" />
          <ShareButton />
        </div>
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="toolbar-bottom">
      <section className="left">
        <MATButton article={article} />
        <Appreciators article={article} />
      </section>
      <section className="right">
        <CommentButton article={article} />
        <BookmarkButton article={article} size="default" />
        <ShareButton />
        <MoreButton article={article} />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

Toolbar.fragments = fragments

export default Toolbar
