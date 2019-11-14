import gql from 'graphql-tag'

import { TextIcon } from '~/components'
import IconLike from '~/components/Icon/Like'

import { numAbbr } from '~/common/utils'

import { AppreciationArticle } from './__generated__/AppreciationArticle'

const fragments = {
  article: gql`
    fragment AppreciationArticle on Article {
      appreciationsReceivedTotal
    }
  `
}

const Appreciation = ({
  article,
  size = 'small'
}: {
  article: AppreciationArticle
  size?: 'small' | 'xsmall'
}) => (
  <TextIcon
    icon={<IconLike size={size} />}
    color="grey"
    weight="medium"
    text={numAbbr((article && article.appreciationsReceivedTotal) || 0)}
    size={size === 'small' ? 'sm' : 'xs'}
    spacing="xtight"
  />
)

Appreciation.fragments = fragments

export default Appreciation
