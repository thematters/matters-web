import gql from 'graphql-tag'
import _get from 'lodash/get'

import { BookmarkButton } from '~/components/Button/Bookmark'
import Appreciators from './Appreciators'
import CommentButton from './CommentButton'
import ExtendButton from './ExtendButton'
import MATButton from './MATButton'
import MoreButton from './MoreButton'
import ShareButton from './ShareButton'
import StreamsButton from './StreamsButton'

import { ToolbarArticle } from './__generated__/ToolbarArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment ToolbarArticle on Article {
      ...MATArticle
      ...AppreciatorsArticle
      ...BookmarkArticle
      ...CommentButtonArticle
    }
    ${MATButton.fragments.article}
    ${Appreciators.fragments.article}
    ${BookmarkButton.fragments.article}
    ${CommentButton.fragments.article}
  `
}

const Toolbar = ({
  article,
  placement
}: {
  article: ToolbarArticle
  placement: 'bottom' | 'left'
}) => {
  return (
    <>
      <section className="left">
        <MATButton article={article} />
        <Appreciators article={article} />
      </section>
      <section className="right">
        <ExtendButton />
        <StreamsButton />
        <CommentButton article={article} />
        <BookmarkButton article={article} size="default" />
        <ShareButton />
        <MoreButton />
      </section>
      <style jsx>{styles}</style>
    </>
  )
}

Toolbar.fragments = fragments

export default Toolbar
