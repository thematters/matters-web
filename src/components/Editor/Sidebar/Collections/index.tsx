import { FieldInputProps, FormikProvider, useField, useFormik } from 'formik'
import { useId, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import IconUp from '@/public/static/icons/24px/up.svg'
import { MAX_COLLECTION_ARTICLES_COUNT } from '~/common/enums'
import { Form, Icon } from '~/components'
import { SetCollectionsProps } from '~/components/Editor'
import { SquareCheckBoxBoxProps } from '~/components/Form/SquareCheckBox'

import Box from '../Box'
import styles from './styles.module.css'

export type SidebarCollectionsProps = {
  checked: string[]
  disabled?: boolean
} & SetCollectionsProps

interface FormValues {
  checked: string[]
}

const SquareCheckBoxField: React.FC<SquareCheckBoxBoxProps> = (props) => {
  const [field] = useField({ name: props.name, type: 'checkbox' })
  return <Form.SquareCheckBox {...field} {...props} />
}

const SidebarCollections = ({
  checked,
  collections,
  editCollections,
  disabled,
}: SidebarCollectionsProps) => {
  const intl = useIntl()
  const [isEditing, setIsEditing] = useState(false)

  const formId = useId()

  const formik = useFormik<FormValues>({
    initialValues: {
      checked,
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ checked }, {}) => {
      if (!checked) {
        return
      }

      editCollections(checked)
    },
  })

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
      <div className={styles.content}>
        <FormikProvider value={formik}>
          <Form
            id={formId}
            onSubmit={formik.handleSubmit}
            onChange={formik.handleSubmit}
            className={styles.listForm}
          >
            {collections.map((collection) => (
              <section key={collection.id} className={styles.item}>
                <SquareCheckBoxField
                  hasTooltip={true}
                  checked={formik.values.checked.includes(collection.id)}
                  left={
                    collection.articles.totalCount >=
                    MAX_COLLECTION_ARTICLES_COUNT ? (
                      <span className={styles.full}>
                        <FormattedMessage
                          defaultMessage="FULL"
                          id="Jxr/TM"
                          description="src/components/Dialogs/AddCollectionsArticleDialog/SelectDialogContent.tsx"
                        />
                      </span>
                    ) : undefined
                  }
                  hint={collection.title}
                  disabled={
                    collection.articles.totalCount >=
                    MAX_COLLECTION_ARTICLES_COUNT
                  }
                  {...(formik.getFieldProps('checked') as FieldInputProps<
                    string[]
                  >)}
                  value={collection.id}
                />
              </section>
            ))}
          </Form>
        </FormikProvider>
      </div>
    </Box>
  )
}

export default SidebarCollections
