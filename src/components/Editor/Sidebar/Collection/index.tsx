import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconHelp } from '@/public/static/icons/24px/help.svg'
import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { MAX_ARTICLE_COLLECT_LENGTH } from '~/common/enums'
import {
  ArticleDigestDropdown,
  EditorSearchSelectDialog,
  Icon,
  Tooltip,
} from '~/components'
import { SetCollectionProps } from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import {
  ArticleDigestDropdownArticleFragment,
  SearchExclude,
} from '~/gql/graphql'

import ArticleCustomStagingArea from '../../ArticleCustomStagingArea'
import Box from '../Box'
import { CollectionInput } from './CollectionInput'
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
  const intl = useIntl()
  const [isEditing, setIsEditing] = useState(false)

  const onAddArticle = (article: ArticleDigestDropdownArticleFragment) => {
    editCollection([...collection, article])
  }

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
          title={
            <div className={styles.title}>
              <FormattedMessage defaultMessage="Curated Article" id="FLLX7c" />
              <Tooltip
                content={
                  <FormattedMessage
                    defaultMessage="Citations and links to related articles can extend curation or thematic reading features"
                    id="uhiBn9"
                  />
                }
                zIndex={1000}
                placement="top"
                touch={['hold', 1000]}
              >
                <span>
                  <Icon icon={IconHelp} size={14} />
                </span>
              </Tooltip>
            </div>
          }
          subtitle={
            <FormattedMessage
              defaultMessage="Help readers discover articles more easily"
              id="znN84l"
            />
          }
          rightButton={
            <>
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className={styles.rightButton}
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Close',
                    id: 'rbrahO',
                  })}
                >
                  <Icon icon={IconTimes} size={24} color="black" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.rightButton}
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Add Tags',
                    id: 'WNxQX0',
                  })}
                  disabled={collection.length >= MAX_ARTICLE_COLLECT_LENGTH}
                >
                  <Icon icon={IconPlus} size={24} color="black" />
                </button>
              )}
            </>
          }
          disabled={disabled}
        >
          <div className={styles.content}>
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
            {isEditing && (
              <div className={styles.collectionInput}>
                <CollectionInput
                  collection={collection}
                  onAddArticle={onAddArticle}
                  saving={collectionSaving}
                />
              </div>
            )}
          </div>
        </Box>
      )}
    </EditorSearchSelectDialog>
  )
}

export default SidebarCollection
