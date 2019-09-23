import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'
import ICON_LIKE from '~/static/icons/like.svg?sprite'

import { AppreciationArticle } from './__generated__/AppreciationArticle'

const fragments = {
  article: gql`
    fragment AppreciationArticle on Article {
      appreciationTotal
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
    icon={<Icon size={size} id={ICON_LIKE.id} viewBox={ICON_LIKE.viewBox} />}
    color="grey"
    weight="medium"
    text={numAbbr(_get(article, 'appreciationTotal', 0))}
    size={size === 'small' ? 'sm' : 'xs'}
    spacing="xtight"
  />
)

Appreciation.fragments = fragments

export default Appreciation
