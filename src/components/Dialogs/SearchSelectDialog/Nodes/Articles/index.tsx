import classNames from 'classnames'
import { Fragment } from 'react'

import {
  ArticleDigestDropdown,
  IconCheckedMedium,
  IconCheckMedium,
  Menu,
} from '~/components'

import styles from '../styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

export interface SearchSelectArticle {
  node: ArticleDigestDropdownArticle
  selected?: boolean
}

interface SearchSelectArticlesProps {
  articles: SearchSelectArticle[]
  onClick: (article: ArticleDigestDropdownArticle) => void
  inStagingArea?: boolean
}

export const SearchSelectArticles: React.FC<SearchSelectArticlesProps> = ({
  articles,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    node: true,
    selectable: inStagingArea,
  })

  return (
    <Menu spacingY={0}>
      {articles.map(({ node, selected }) => (
        <Fragment key={node.id}>
          <Menu.Divider />

          <Menu.Item spacing={['tight', 'base']} onClick={() => onClick(node)}>
            <section className={nodeClass}>
              <ArticleDigestDropdown
                article={node}
                titleTextSize="sm"
                spacing={[0, 0]}
                bgColor="none"
                disabled
              />

              <span className="icon-select">
                {inStagingArea && selected && (
                  <IconCheckedMedium color="green" size="md" />
                )}
                {inStagingArea && !selected && (
                  <IconCheckMedium color="grey-light" size="md" />
                )}
              </span>

              <style jsx> {styles}</style>
            </section>
          </Menu.Item>
        </Fragment>
      ))}
    </Menu>
  )
}
