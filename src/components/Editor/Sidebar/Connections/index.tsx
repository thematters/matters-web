import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconHelp from '@/public/static/icons/24px/help.svg'
import IconPlus from '@/public/static/icons/24px/plus.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import { MAX_ARTICLE_COLLECT_LENGTH } from '~/common/enums'
import { Icon, Tooltip } from '~/components'
import { SetConnectionsProps } from '~/components/Editor'
import { ArticleDigestDropdownArticleFragment } from '~/gql/graphql'

import Box from '../Box'
import { ConnectionInput } from './ConnectionInput'
import { ArticleDigestDraftTitle } from './DraftTitle'
import styles from './styles.module.css'

export type SidebarConnectionsProps = {
  disabled?: boolean
} & SetConnectionsProps

const SidebarConnections = ({
  connections,
  editConnections,
  connectionsSaving,
  disabled,
}: SidebarConnectionsProps) => {
  const intl = useIntl()
  const [isEditing, setIsEditing] = useState(false)

  const onAddArticle = async (
    article: ArticleDigestDropdownArticleFragment
  ) => {
    await editConnections([...connections, article])
    setIsEditing(false)
  }

  const onRemoveArticle = (article: ArticleDigestDropdownArticleFragment) => {
    editConnections(connections.filter((a) => a.id !== article.id))
  }

  return (
    <Box
      title={
        <div className={styles.title}>
          <FormattedMessage defaultMessage="Curate Article" id="d5Y+dZ" />
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
              disabled={connections.length >= MAX_ARTICLE_COLLECT_LENGTH}
            >
              <Icon icon={IconPlus} size={24} color="black" />
            </button>
          )}
        </>
      }
      disabled={disabled}
    >
      <div className={styles.content}>
        {connections.length > 0 && (
          <ul className={styles.list}>
            {connections.map((article) => (
              <li key={article.id}>
                <ArticleDigestDraftTitle
                  article={article}
                  onRemove={() => onRemoveArticle(article)}
                  saving={connectionsSaving}
                />
              </li>
            ))}
          </ul>
        )}
        {isEditing && (
          <div className={styles.connectionInput}>
            <ConnectionInput
              connections={connections}
              onAddArticle={onAddArticle}
              saving={connectionsSaving}
            />
          </div>
        )}
      </div>
    </Box>
  )
}

export default SidebarConnections
