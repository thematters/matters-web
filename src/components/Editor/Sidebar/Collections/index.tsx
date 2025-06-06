import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import IconUp from '@/public/static/icons/24px/up.svg'
import { Icon } from '~/components'
import { SetCollectionsProps } from '~/components/Editor'

import Box from '../Box'
import styles from './styles.module.css'

export type SidebarCollectionsProps = {
  disabled?: boolean
} & SetCollectionsProps

const SidebarCollections = ({
  // collections,
  // editCollections,
  // collectionsSaving,
  disabled,
}: SidebarCollectionsProps) => {
  const intl = useIntl()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Box
      title={
        <div className={styles.title}>
          <FormattedMessage defaultMessage="Add to Collection" id="lFi0TA" />
        </div>
      }
      subtitle={
        <FormattedMessage
          defaultMessage="Help compile your stories into a book"
          id="1eKD7S"
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
              <Icon icon={IconUp} size={24} color="black" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className={styles.rightButton}
              aria-label={intl.formatMessage({
                defaultMessage: 'Add',
                id: '2/2yg+',
              })}
            >
              <Icon icon={IconDown} size={24} color="black" />
            </button>
          )}
        </>
      }
      disabled={disabled}
    >
      <div className={styles.content}></div>
    </Box>
  )
}

export default SidebarCollections
