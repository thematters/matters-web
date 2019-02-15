import gql from 'graphql-tag'
import { get } from 'lodash'

import { Icon, TextIcon } from '~/components'

import ICON_COMMENT_SM from '~/static/icons/comment-small.svg?sprite'

interface CommentCountProps {
  article?: {
    comments?: {
      totalCount?: number
    }
  }
  size?: 'small' | 'default'
}

const fragments = {
  article: gql`
    fragment CommentCountArticle on Article {
      comments(input: { first: 0 }) {
        totalCount
      }
    }
  `
}

const CommentCount: React.SFC<CommentCountProps> & {
  fragments: typeof fragments
} = ({ article, size = 'default' }) => (
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
    text={get(article, 'comments.totalCount', '')}
    size={size === 'default' ? 'sm' : 'xs'}
    spacing="xxtight"
  />
)

CommentCount.fragments = fragments

export default CommentCount
