import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import { Spinner, TextIcon } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { Query } from '~/components/GQL'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Popover } from '~/components/Popper'

import { numAbbr } from '~/common/utils'
import ICON_DIRECTION from '~/static/icons/direction.svg?sprite'

import { CollectedBy_article_collectedBy_edges_node } from './__generated__/CollectedBy'
import { CollectedByArticle } from './__generated__/CollectedByArticle'
import styles from './styles.css'

export const COLLECTED_BY = gql`
  query CollectedBy($mediaHash: String) {
    article(input: { mediaHash: $mediaHash })
      @connection(key: "articleCollectedBy") {
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
  }
  ${ArticleDigest.Dropdown.fragments.article}
`

const CollectedBy = ({ article }: { article: any }) => (
  <div className="container">
    <Query query={COLLECTED_BY} variables={{ mediaHash: article.mediaHash }}>
      {({ data, loading, error }: QueryResult) => {
        if (loading) {
          return <Spinner />
        }

        const path = 'article.collectedBy'
        const { edges } = _get(data, path, {})

        return (
          <>
            <h3>
              <Translate
                zh_hant="關聯了本文的作品"
                zh_hans="关联了本文的作品"
              />
            </h3>

            <ul>
              {edges &&
                edges.map(
                  ({
                    node
                  }: {
                    node: CollectedBy_article_collectedBy_edges_node
                  }) => (
                    <li key={node.id}>
                      <ArticleDigest.Dropdown
                        article={node}
                        hasArchivedTooltip
                      />
                    </li>
                  )
                )}
            </ul>
          </>
        )
      }}
    </Query>

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
  const collectedByCount = _get(article, 'collectedBy.totalCount', 0)

  if (collectedByCount <= 0) {
    return null
  }

  return (
    <Popover
      trigger="click"
      offset="40,0"
      content={<CollectedBy article={article} />}
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
          text={numAbbr(collectedByCount)}
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
      mediaHash
      collectedBy(input: { first: 0 }) @connection(key: "articleCollectedBy") {
        totalCount
      }
    }
  `
}

export default CollectedByButton
