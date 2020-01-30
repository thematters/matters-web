import gql from 'graphql-tag'

import { Icon, TextIcon } from '~/components'

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
  size = 'sm'
}: {
  article: AppreciationArticle
  size?: 'sm' | 'xs'
}) => (
  <TextIcon
    icon={<Icon.Like size={size === 'xs' ? 'xs' : undefined} />}
    color="grey"
    weight="md"
    size={size}
    spacing="xtight"
  >
    {numAbbr((article && article.appreciationsReceivedTotal) || 0)}
  </TextIcon>
)

Appreciation.fragments = fragments

export default Appreciation
