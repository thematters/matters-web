import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCollection } from '@/public/static/icons/24px/collection.svg'
import {
  ArticleDigestDropdown,
  EditorSearchSelectDialog,
  Icon,
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
      title={<FormattedMessage defaultMessage="Collect Article" id="vX2bDy" />}
      hint={
        <FormattedMessage
          defaultMessage="Adding articles to a collection helps readers find your articles."
          id="XTyKFR"
        />
      }
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
          icon={<Icon icon={IconCollection} size="md" />}
          title={
            <FormattedMessage defaultMessage="Collect Article" id="vX2bDy" />
          }
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
