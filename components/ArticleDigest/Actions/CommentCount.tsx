import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'

import ICON_COMMENT_SM from '~/static/icons/comment-small.svg?sprite'

import { CommentCountArticle } from './__generated__/CommentCountArticle'

const fragments = {
  article: gql`
    fragment CommentCountArticle on Article {
      comments(input: { first: 0 }) {
        totalCount
      }
    }
  `
}

const CommentCount = ({
  article,
  size = 'default'
}: {
  article: CommentCountArticle
  size?: 'small' | 'default'
}) => (
  <TextIcon
    icon={
      <Icon
        size={size === 'default' ? 'small' : 'xsmall'}
        id={ICON_COMMENT_SM.id}
        viewBox={ICON_COMMENT_SM.viewBox}
      />
    }
    color="grey"
    weight="medium"
    text={_get(article, 'comments.totalCount', '')}
    size={size === 'default' ? 'sm' : 'xs'}
    spacing="xxtight"
  />
)

CommentCount.fragments = fragments

export default CommentCount
