import {
  ArticleDigestDropdown,
  EditorSearchSelectDialog,
  IconCollection24,
} from '~/components'
import { SetCollectionProps } from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import {
  ArticleDigestDropdownArticleFragment,
  SearchExclude,
} from '~/gql/graphql'

import ArticleCustomStagingArea from '../../ArticleCustomStagingArea'
import Box from '../Box'
import styles from './styles.module.css'

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
    <EditorSearchSelectDialog
      title="collectArticle"
      hint="hintEditCollection"
      searchType="Article"
      searchExclude={SearchExclude.Blocked}
      onSave={(nodes: SearchSelectNode[]) =>
        editCollection(nodes as ArticleDigestDropdownArticleFragment[])
      }
      nodes={collection}
      saving={collectionSaving}
      CustomStagingArea={ArticleCustomStagingArea}
    >
      {({ openDialog }) => (
        <Box
          icon={<IconCollection24 size="md" />}
          title="collectArticle"
          onClick={openDialog}
          disabled={disabled}
        >
          {collection.length > 0 && (
            <ul className={styles.list}>
              {collection.map((article) => (
                <li key={article.id}>
                  <ArticleDigestDropdown
                    article={article}
                    titleTextSize="sm"
                    spacing={['base', 'base']}
                    bgColor="none"
                    bgActiveColor="greyLighter"
                  />
                </li>
              ))}
            </ul>
          )}
        </Box>
      )}
    </EditorSearchSelectDialog>
  )
}

export default SidebarCollection
