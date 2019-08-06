import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'

import { MATArticle } from './__generated__/MATArticle'

const fragments = {
  article: gql`
    fragment MATArticle on Article {
      MAT
    }
  `
}

const MAT = ({
  article,
  size = 'small'
}: {
  article: MATArticle
  size?: 'small' | 'xsmall'
}) => (
  <TextIcon
    icon={
      <Icon size={size} id={ICON_MAT_GOLD.id} viewBox={ICON_MAT_GOLD.viewBox} />
    }
    color="gold"
    weight="medium"
    text={numAbbr(_get(article, 'MAT', 0))}
    size={size === 'small' ? 'sm' : 'xs'}
    spacing="xxxtight"
  />
)

MAT.fragments = fragments

export default MAT
