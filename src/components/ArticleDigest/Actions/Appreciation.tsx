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
    icon={<Icon.Like size={size} />}
    color="grey"
    weight="medium"
    text={numAbbr((article && article.appreciationsReceivedTotal) || 0)}
    size={size}
    spacing="xtight"
  />
)

Appreciation.fragments = fragments

export default Appreciation
