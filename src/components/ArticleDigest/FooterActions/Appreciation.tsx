import { gql } from '@apollo/client'

import { Button, IconClap16, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'

import { AppreciationArticle } from './__generated__/AppreciationArticle'

const fragments = {
  article: gql`
    fragment AppreciationArticle on Article {
      appreciationsReceivedTotal
    }
  `,
}

const Appreciation = ({ article }: { article: AppreciationArticle }) => (
  <Button spacing={['xtight', 'xtight']} is="span">
    <TextIcon icon={<IconClap16 />} color="grey" weight="md" size="sm">
      {article.appreciationsReceivedTotal > 0
        ? numAbbr(article.appreciationsReceivedTotal)
        : undefined}
    </TextIcon>
  </Button>
)

Appreciation.fragments = fragments

export default Appreciation
