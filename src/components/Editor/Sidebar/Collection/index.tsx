import { ArticleDigestDropdown, IconCollectionMedium } from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'

import Box from '../Box'
import styles from './styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

interface CollectionProps {
  articles: ArticleDigestDropdownArticle[]
  onEdit: (articles: ArticleDigestDropdownArticle[]) => any
  saving?: boolean
  disabled?: boolean
}

const Collection = ({
  articles,
  onEdit,
  saving,
  disabled,
}: CollectionProps) => {
  return (
    <SearchSelectDialog
      title="tagAddArticle"
      hint="hintEditCollection"
      searchType="Article"
      onSave={(nodes: SearchSelectNode[]) =>
        onEdit(nodes as ArticleDigestDropdownArticle[])
      }
      nodes={articles}
      saving={saving}
    >
      {({ open: openAddMyArticlesDialog }) => (
        <Box
          icon={<IconCollectionMedium size="md" />}
          title="extendArticle"
          onClick={openAddMyArticlesDialog}
          disabled={disabled}
        >
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleDigestDropdown
                  article={article}
                  titleTextSize="sm"
                  spacing={['base', 'base']}
                  bgColor="none"
                  bgActiveColor="grey-lighter"
                />
              </li>
            ))}

            <style jsx>{styles}</style>
          </ul>
        </Box>
      )}
    </SearchSelectDialog>
  )
}

export default Collection
