import { FormattedMessage } from 'react-intl'

import IconCollection from '@/public/static/icons/24px/collection.svg'
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
  nodeExclude,
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
      nodeExclude={nodeExclude}
      onSave={(nodes: SearchSelectNode[]) =>
        editCollection(nodes as ArticleDigestDropdownArticleFragment[])
      }
      nodes={collection}
      saving={collectionSaving}
      CustomStagingArea={ArticleCustomStagingArea}
      dismissOnClickOutside={false}
      dismissOnESC={false}
    >
      {({ openDialog }) => (
        <Box
          icon={<Icon icon={IconCollection} size={24} />}
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
                    titleTextSize={14}
                    spacing={[16, 16]}
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
