import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { MAX_REVISION_DESCRIPTION_LENGTH } from '~/common/enums'
import { Dialog, Form } from '~/components'

interface FormProps {
  back?: () => any
  closeDialog: () => void
  submitCallback?: () => void

  description: string
  editDescription: (description: string) => any
}

interface FormValues {
  description: string
}

const SetVersionDescriptionDialogContent: React.FC<FormProps> = ({
  back,
  closeDialog,
  submitCallback,

  description,
  editDescription,
}) => {
  const formId = useId()
  const intl = useIntl()

  const {
    values,
    errors,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: { description },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({}, { setSubmitting }) => {
      editDescription(values.description)

      setSubmitting(false)

      if (submitCallback) {
        submitCallback()
      } else {
        closeDialog()
      }
    },
  })

  const isOverLength =
    values.description.length > MAX_REVISION_DESCRIPTION_LENGTH
  const hint = `${values.description.length}/${MAX_REVISION_DESCRIPTION_LENGTH}`

  const InnerForm = () => {
    return (
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Textarea
          label={
            <FormattedMessage
              defaultMessage="Version Description"
              id="rDX3h6"
            />
          }
          name="replyToDonator"
          placeholder={intl.formatMessage({
            defaultMessage: 'Tell readers why you edited this time...',
            id: 'HzB4Lk',
          })}
          value={values.description}
          hint={hint}
          error={isOverLength ? hint : errors.description}
          hintAlign={errors.description ? 'left' : 'right'}
          onBlur={handleBlur}
          onChange={(e) => setFieldValue('description', e.currentTarget.value)}
        />
      </Form>
    )
  }

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={!isValid || isOverLength || isSubmitting}
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Version Description" id="rDX3h6" />
        }
        closeDialog={closeDialog}
        leftBtn={
          back ? (
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={back}
            />
          ) : null
        }
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm()}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                back ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                )
              }
              color="greyDarker"
              onClick={back || closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default SetVersionDescriptionDialogContent
