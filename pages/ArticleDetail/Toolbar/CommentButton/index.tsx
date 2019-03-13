import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'
import { DrawerConsumer } from '~/components/Drawer'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, numAbbr } from '~/common/utils'
import ICON_COMMENT_REGULAR from '~/static/icons/comment-regular.svg?sprite'

import { CommentButtonArticle } from './__generated__/CommentButtonArticle'

const fragments = {
  article: gql`
    fragment CommentButtonArticle on Article {
      id
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
        onClick={() => {
          if (opened) {
            close()
          } else {
            open()
            analytics.trackEvent(ANALYTICS_EVENTS.OPEN_COMMENTS, {
              entrance: article.id
            })
          }
        }}
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
          text={numAbbr(_get(article, 'comments.totalCount', 0))}
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
