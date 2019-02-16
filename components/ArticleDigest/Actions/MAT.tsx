import gql from 'graphql-tag'
import { get } from 'lodash'

import { Icon, TextIcon } from '~/components'

import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'

interface MATProps {
  article?: {
    MAT?: number
  }
  size?: 'small' | 'default'
}

const fragments = {
  article: gql`
    fragment MATArticle on Article {
      MAT
    }
  `
}

const MAT: React.SFC<MATProps> & { fragments: typeof fragments } = ({
  article,
  size = 'default'
}) => (
  <TextIcon
    icon={
      <Icon
        size={size === 'default' ? 'small' : 'xsmall'}
        id={ICON_MAT_GOLD.id}
        viewBox={ICON_MAT_GOLD.viewBox}
      />
    }
    color="gold"
    weight="medium"
    text={get(article, 'MAT', '')}
    size={size === 'default' ? 'sm' : 'xs'}
    spacing="xxxtight"
  />
)

MAT.fragments = fragments

export default MAT
