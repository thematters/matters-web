import gql from 'graphql-tag'

import { Button, IconLike, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'

import { AppreciationArticle } from './__generated__/AppreciationArticle'

const fragments = {
  article: gql`
    fragment AppreciationArticle on Article {
      appreciationsReceivedTotal
    }
  `,
}

const Appreciation = ({
  article,
  size = 'sm',
}: {
  article: AppreciationArticle
  size?: 'sm' | 'xs'
}) => (
  <Button spacing={['xtight', 'xtight']} is="span">
    <TextIcon
      icon={<IconLike size={size === 'xs' ? 'xs' : undefined} />}
      color="grey"
      weight="md"
      size={size}
    >
      {article.appreciationsReceivedTotal > 0
        ? numAbbr(article.appreciationsReceivedTotal)
        : undefined}
    </TextIcon>
  </Button>
)

Appreciation.fragments = fragments

export default Appreciation
