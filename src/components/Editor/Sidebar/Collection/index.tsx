import { ArticleDigestDropdown, IconCollection24 } from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'

import Box from '../Box'
import styles from './styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

export interface SidebarCollectionProps {
  articles: ArticleDigestDropdownArticle[]
  onEdit: (articles: ArticleDigestDropdownArticle[]) => any
  saving?: boolean
  disabled?: boolean
}

const SidebarCollection = ({
  articles,
  onEdit,
  saving,
  disabled,
}: SidebarCollectionProps) => {
  return (
    <SearchSelectDialog
      title="extendArticle"
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
          icon={<IconCollection24 size="md" />}
          title="extendArticle"
          onClick={openAddMyArticlesDialog}
          disabled={disabled}
        >
          {articles.length > 0 && (
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
          )}
        </Box>
      )}
    </SearchSelectDialog>
  )
}

export default SidebarCollection
