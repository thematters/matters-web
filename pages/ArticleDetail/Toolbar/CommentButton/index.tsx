import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'
import { DrawerConsumer } from '~/components/Drawer'

import ICON_COMMENT_REGULAR from '~/static/icons/comment-regular.svg?sprite'

import { CommentButtonArticle } from './__generated__/CommentButtonArticle'

const fragments = {
  article: gql`
    fragment CommentButtonArticle on Article {
      comments(input: { first: 0 }) {
        totalCount
      }
    }
  `
}

const CommentButton = ({
  article,
  textPlacement = 'right'
}: {
  article: CommentButtonArticle
  textPlacement?: 'bottom' | 'right'
}) => (
  <DrawerConsumer>
    {({ opened, open, close }) => (
      <button
        type="button"
        aria-label="查看評論"
        onClick={() => (opened ? close() : open())}
      >
        <TextIcon
          icon={
            <Icon
              size="default"
              id={ICON_COMMENT_REGULAR.id}
              viewBox={ICON_COMMENT_REGULAR.viewBox}
            />
          }
          color="grey"
          weight="medium"
          text={_get(article, 'comments.totalCount', '')}
          textPlacement={textPlacement}
          size="xs"
          spacing={textPlacement === 'bottom' ? 'xxxtight' : 'xxtight'}
        />
      </button>
    )}
  </DrawerConsumer>
)

CommentButton.fragments = fragments

export default CommentButton
