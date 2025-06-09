import { FieldInputProps, FormikProvider, useFormik } from 'formik'
import { useCallback, useId, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDebouncedCallback } from 'use-debounce'

import IconDown from '@/public/static/icons/24px/down.svg'
import IconUp from '@/public/static/icons/24px/up.svg'
import { INPUT_DEBOUNCE, MAX_COLLECTION_ARTICLES_COUNT } from '~/common/enums'
import { Form, Icon } from '~/components'
import { SetCollectionsProps } from '~/components/Editor'
import { CollectionDigestCollectionPublicFragment } from '~/gql/graphql'

import Box from '../Box'
import { CollectionDigest } from './CollectionDigest'
import styles from './styles.module.css'

export type SidebarCollectionsProps = {
  checkedCollections: CollectionDigestCollectionPublicFragment[]
  disabled?: boolean
} & SetCollectionsProps

interface FormValues {
  checked: string[]
}

const CollectionItem = ({
  collection,
  isChecked,
  getFieldProps,
  disabled,
}: {
  collection: CollectionDigestCollectionPublicFragment
  isChecked: boolean
  getFieldProps: (name: string) => FieldInputProps<string[]>
  disabled?: boolean
}) => {
  const isFull = collection.articles.totalCount >= MAX_COLLECTION_ARTICLES_COUNT
  const isItemDisabled = disabled || isFull

  return (
    <section className={styles.item}>
      <Form.SquareCheckBox
        hasTooltip
        checkedBoxColor="black"
        checked={isChecked}
        left={
          isFull ? (
            <span className={styles.full}>
              <FormattedMessage defaultMessage="FULL" id="dSx84k" />
            </span>
          ) : undefined
        }
        hint={collection.title}
        disabled={isItemDisabled}
        {...getFieldProps('checked')}
        value={collection.id}
        contents={
          isFull ? (
            <span className={styles.collectionTitle}>{collection.title}</span>
          ) : (
            collection.title
          )
        }
      />
    </section>
  )
}

const CollectionsEditForm = ({
  collections,
  initialChecked,
  onSubmit,
  disabled,
}: {
  collections: CollectionDigestCollectionPublicFragment[]
  initialChecked: string[]
  onSubmit: (checked: string[]) => void
  disabled?: boolean
}) => {
  const formId = useId()

  const formik = useFormik<FormValues>({
    initialValues: { checked: initialChecked },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ checked }) => {
      if (checked) {
        onSubmit(checked)
      }
    },
  })

  const debouncedSubmit = useDebouncedCallback(() => {
    formik.handleSubmit()
  }, INPUT_DEBOUNCE)

  return (
    <div className={styles.content}>
      <FormikProvider value={formik}>
        <Form
          id={formId}
          onSubmit={formik.handleSubmit}
          onChange={debouncedSubmit}
          className={styles.listForm}
        >
          {collections.map((collection) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              isChecked={formik.values.checked.includes(collection.id)}
              getFieldProps={formik.getFieldProps}
              disabled={disabled}
            />
          ))}
        </Form>
      </FormikProvider>
    </div>
  )
}

const SelectedCollectionsList = ({
  checkedCollections,
  onRemove,
}: {
  checkedCollections: CollectionDigestCollectionPublicFragment[]
  onRemove: (collectionId: string) => void
}) => (
  <div className={`${styles.content} ${styles.checkedCollections}`}>
    {checkedCollections.map((collection) => (
      <CollectionDigest
        key={collection.id}
        collection={collection}
        onRemove={onRemove}
      />
    ))}
  </div>
)

const ToggleButton = ({
  isEditing,
  onToggle,
  disabled,
}: {
  isEditing: boolean
  onToggle: () => void
  disabled?: boolean
}) => {
  const intl = useIntl()

  return (
    <button
      onClick={onToggle}
      className={styles.rightButton}
      disabled={disabled}
      aria-label={intl.formatMessage(
        isEditing
          ? { defaultMessage: 'Close', id: 'rbrahO' }
          : { defaultMessage: 'Add', id: '2/2yg+' }
      )}
    >
      <Icon icon={isEditing ? IconUp : IconDown} size={24} color="black" />
    </button>
  )
}

const SidebarCollections = ({
  checkedCollections,
  collections,
  editCollections,
  disabled,
}: SidebarCollectionsProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const checkedIds = checkedCollections.map((collection) => collection.id)

  const handleRemove = useCallback(
    (collectionId: string) => {
      const newChecked = checkedIds.filter((id) => id !== collectionId)
      editCollections(newChecked)
    },
    [checkedIds, editCollections]
  )

  const handleFormSubmit = useCallback(
    (checked: string[]) => {
      editCollections(checked)
    },
    [editCollections]
  )

  const handleToggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev)
  }, [])

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
        <ToggleButton
          isEditing={isEditing}
          onToggle={handleToggleEdit}
          disabled={disabled}
        />
      }
      disabled={disabled}
    >
      {isEditing ? (
        <CollectionsEditForm
          collections={collections}
          initialChecked={checkedIds}
          onSubmit={handleFormSubmit}
          disabled={disabled}
        />
      ) : (
        <SelectedCollectionsList
          checkedCollections={checkedCollections}
          onRemove={handleRemove}
        />
      )}
    </Box>
  )
}

export default SidebarCollections
