import gql from 'graphql-tag'
import { useState } from 'react'

import { ArticleDigest } from '~/components/ArticleDigest'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Popover, PopperInstance } from '~/components/Popper'

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
            <li>
              <ArticleDigest.Dropdown article={node} />
            </li>
          )
        )}
    </ul>
    <style jsx>{styles}</style>
  </div>
)

const CollectedByButton = ({
  article,
  popperPlacement = 'right'
}: {
  article: CollectedByArticle
  popperPlacement?: 'right' | 'top'
}) => {
  if (
    !article.collectedBy ||
    !article.collectedBy.edges ||
    article.collectedBy.edges.length === 0
  ) {
    return null
  }

  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const toggleDropdown = () => {
    if (!instance) {
      return
    }
    if (
      instance.state.isMounted ||
      instance.state.isShown ||
      instance.state.isVisible
    ) {
      instance.hide()
    } else {
      instance.show()
    }
  }

  return (
    <Popover
      arrow={true}
      zIndex={101}
      trigger="manual"
      onCreate={setInstance}
      offset="40,0"
      content={<CollectedBy collectedBy={article.collectedBy} />}
      placement={popperPlacement}
    >
      <button
        type="button"
        onClick={() => {
          toggleDropdown()
        }}
      >
        <Icon
          size="default"
          id={ICON_DIRECTION.id}
          viewBox={ICON_DIRECTION.viewBox}
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
