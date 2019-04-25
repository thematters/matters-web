import gql from 'graphql-tag'
import _get from 'lodash/get'

import { TextIcon } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Popover } from '~/components/Popper'

import { numAbbr } from '~/common/utils'
import ICON_DIRECTION from '~/static/icons/direction.svg?sprite'

import {
  CollectedByArticle,
  CollectedByArticle_collectedBy,
  CollectedByArticle_collectedBy_edges
} from './__generated__/CollectedByArticle'
import styles from './styles.css'

const CollectedBy = ({
  collectedBy
}: {
  collectedBy: CollectedByArticle_collectedBy
}) => (
  <div className="container">
    <h3>
      <Translate zh_hant="關聯了本文的作品" zh_hans="关联了本文的作品" />
    </h3>

    <ul>
      {collectedBy.edges &&
        collectedBy.edges.map(
          ({ node }: CollectedByArticle_collectedBy_edges) => (
            <li key={node.id}>
              <ArticleDigest.Dropdown article={node} hasArchivedTooltip />
            </li>
          )
        )}
    </ul>
    <style jsx>{styles}</style>
  </div>
)

const CollectedByButton = ({
  article,
  popperPlacement = 'right',
  textPlacement = 'right'
}: {
  article: CollectedByArticle
  popperPlacement?: 'right' | 'top'
  textPlacement?: 'bottom' | 'right'
}) => {
  if (_get(article, 'collectedBy.edges.length', 0) <= 0) {
    return null
  }

  return (
    <Popover
      trigger="click"
      offset="40,0"
      content={<CollectedBy collectedBy={article.collectedBy} />}
      placement={popperPlacement}
    >
      <button type="button">
        <TextIcon
          icon={
            <Icon
              size="default"
              id={ICON_DIRECTION.id}
              viewBox={ICON_DIRECTION.viewBox}
            />
          }
          text={numAbbr(_get(article, 'collectedBy.totalCount', 0))}
          textPlacement={textPlacement}
          color="grey"
          weight="medium"
          size="xs"
          spacing={textPlacement === 'bottom' ? 'xxxtight' : 'xxtight'}
        />
      </button>
    </Popover>
  )
}

CollectedByButton.fragments = {
  article: gql`
    fragment CollectedByArticle on Article {
      id
      collectedBy(input: { first: null }) {
        totalCount
        edges {
          node {
            id
            ...DropdownDigestArticle
          }
        }
      }
    }
    ${ArticleDigest.Dropdown.fragments.article}
  `
}

export default CollectedByButton
