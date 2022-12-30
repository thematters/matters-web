import { ArticleDigestDropdown, IconCollection24 } from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { SetCollectionProps } from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import {
  ArticleDigestDropdownArticleFragment,
  SearchExclude,
} from '~/gql/graphql'

import Box from '../Box'
import styles from './styles.css'

export type SidebarCollectionProps = {
  disabled?: boolean
} & SetCollectionProps

const SidebarCollection = ({
  collection,
  editCollection,
  collectionSaving,
  disabled,
}: SidebarCollectionProps) => {
  return (
    <SearchSelectDialog
      title="collectArticle"
      hint="hintEditCollection"
      searchType="Article"
      searchExclude={SearchExclude.Blocked}
      onSave={(nodes: SearchSelectNode[]) =>
        editCollection(nodes as ArticleDigestDropdownArticleFragment[])
      }
      nodes={collection}
      saving={collectionSaving}
    >
      {({ openDialog }) => (
        <Box
          icon={<IconCollection24 size="md" />}
          title="collectArticle"
          onClick={openDialog}
          disabled={disabled}
        >
          {collection.length > 0 && (
            <ul>
              {collection.map((article) => (
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
