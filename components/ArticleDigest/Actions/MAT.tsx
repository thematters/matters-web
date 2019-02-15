import gql from 'graphql-tag'
import { get } from 'lodash'

import { Icon, TextIcon } from '~/components'

import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'

interface MATProps {
  article?: {
    MAT?: number
  }
}

const fragments = {
  article: gql`
    fragment MATArticle on Article {
      MAT
    }
  `
}

const MAT: React.SFC<MATProps> & { fragments: typeof fragments } = ({
  article
}) => (
  <TextIcon
    icon={
      <Icon
        size="small"
        id={ICON_MAT_GOLD.id}
        viewBox={ICON_MAT_GOLD.viewBox}
      />
    }
    color="gold"
    weight="medium"
    text={get(article, 'MAT', '')}
    size="sm"
    spacing="xxxtight"
  />
)

MAT.fragments = fragments

export default MAT
