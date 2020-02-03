import gql from 'graphql-tag'

import { Button, Icon, TextIcon } from '~/components'

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
  <Button spacing={['xtight', 'xtight']} is="span">
    <TextIcon
      icon={<Icon.Like size={size === 'xs' ? 'xs' : undefined} />}
      color="grey"
      weight="md"
      size={size}
      spacing="xtight"
    >
      {article.appreciationsReceivedTotal > 0
        ? numAbbr(article.appreciationsReceivedTotal)
        : undefined}
    </TextIcon>
  </Button>
)

Appreciation.fragments = fragments

export default Appreciation
