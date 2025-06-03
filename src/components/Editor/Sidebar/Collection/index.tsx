import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconHelp } from '@/public/static/icons/24px/help.svg'
import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { MAX_ARTICLE_COLLECT_LENGTH } from '~/common/enums'
import { Icon, Tooltip } from '~/components'
import { SetCollectionProps } from '~/components/Editor'
import { ArticleDigestDropdownArticleFragment } from '~/gql/graphql'

import Box from '../Box'
import { CollectionInput } from './CollectionInput'
import { ArticleDigestDraftTitle } from './DraftTitle'
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

  const onAddArticle = async (
    article: ArticleDigestDropdownArticleFragment
  ) => {
    await editCollection([...collection, article])
    setIsEditing(false)
  }

  const onRemoveArticle = (article: ArticleDigestDropdownArticleFragment) => {
    editCollection(collection.filter((a) => a.id !== article.id))
  }

  return (
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
                defaultMessage: 'Add',
                id: '2/2yg+',
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
                <ArticleDigestDraftTitle
                  article={article}
                  onRemove={() => onRemoveArticle(article)}
                  saving={collectionSaving}
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
  )
}

export default SidebarCollection
