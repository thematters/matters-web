import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useId, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  MAX_CIRCLE_DISPLAY_NAME_LENGTH,
  MAX_CIRCLE_NAME_LENGTH,
  PAYMENT_CURRENCY,
  PAYMENT_MAXIMUM_CIRCLE_AMOUNT,
  PAYMENT_MINIMAL_CIRCLE_AMOUNT,
} from '~/common/enums'
import {
  analytics,
  normalizeName,
  parseFormSubmitErrors,
  validateCircleAmount,
  validateCircleDisplayName,
  validateCircleName,
} from '~/common/utils'
import { Dialog, Form, Layout, useMutation } from '~/components'
import PUT_CIRCLE from '~/components/GQL/mutations/putCircle'
import { PutCircleMutation } from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: (circle: PutCircleMutation['putCircle']) => void
  closeDialog?: () => void
}

interface FormValues {
  name: string
  displayName: string
  amount: number
}

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const intl = useIntl()
  const [create] = useMutation<PutCircleMutation>(PUT_CIRCLE, undefined, {
    showToast: false,
  })
  const inputRef: React.RefObject<any> | null = useRef(null)
  // const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = useId()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      name: '',
      displayName: '',
      amount: PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ name, displayName, amount }) =>
      _pickBy({
        name: validateCircleName(name, intl),
        displayName: validateCircleDisplayName(displayName, intl),
        amount: validateCircleAmount(amount, intl),
      }),
    onSubmit: async (
      { name, displayName, amount },
      { setFieldError, setSubmitting }
    ) => {
      try {
        analytics.trackEvent('click_button', { type: 'finish_circle_creation' })

        const { data } = await create({
          variables: { input: { name, displayName, amount } },
        })
        const circle = data?.putCircle

        setSubmitting(false)

        if (circle) {
          submitCallback(circle)
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any)
        codes.forEach((code) => {
          if (code === 'NAME_EXISTS') {
            setFieldError(
              'name',
              intl.formatMessage({
                defaultMessage:
                  'This URL name has already been used, try another one',
                id: 'VwuiYK',
                description: 'src/components/Forms/CreateCircleForm/Init.tsx',
              })
            )
          } else if (code === 'NAME_INVALID') {
            setFieldError(
              'name',
              intl.formatMessage({
                defaultMessage:
                  'Must be between 2-20 characters long. Only lowercase letters, numbers and underline are allowed.',
                id: 'CBDDR5',
              })
            )
          } else if (code === 'DISPLAYNAME_INVALID') {
            setFieldError(
              'name',
              intl.formatMessage({
                defaultMessage: 'Must be between 2-12 characters long.',
                id: '+7SAix',
              })
            )
          } else {
            setFieldError('name', intl.formatMessage(messages[code]))
          }
        })
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<FormattedMessage defaultMessage="Circle Name" id="q9oMKE" />}
        hasLabel
        type="text"
        name="displayName"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Enter the name of your Circle',
          id: 'wXzTZ0',
        })}
        value={values.displayName}
        hint={`${values.displayName.length}/${MAX_CIRCLE_DISPLAY_NAME_LENGTH}`}
        error={touched.displayName && errors.displayName}
        hintAlign={touched.displayName && errors.displayName ? 'left' : 'right'}
        maxLength={MAX_CIRCLE_DISPLAY_NAME_LENGTH}
        onBlur={handleBlur}
        onChange={handleChange}
        spacingBottom="base"
      />

      <section className={styles.nameInput}>
        <Form.Input
          label={
            <FormattedMessage
              defaultMessage="Set the Circle URL (cannot be modified after creation)"
              id="QZXKhG"
              description="src/components/Forms/CreateCircleForm/Init.tsx"
            />
          }
          hasLabel
          type="text"
          name="name"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Custom URL Name',
            id: 'eov+J2',
          })}
          value={values.name}
          hint={`${values.name.length}/${MAX_CIRCLE_NAME_LENGTH}`}
          error={touched.name && errors.name}
          hintAlign={touched.name && errors.name ? 'left' : 'right'}
          maxLength={MAX_CIRCLE_NAME_LENGTH}
          onBlur={handleBlur}
          onChange={(e) => {
            const name = normalizeName(e.target.value)
            setFieldValue('name', name)
            return name
          }}
          spacingBottom="base"
        />
      </section>

      <Form.AmountInput
        label={
          <FormattedMessage
            defaultMessage="Set threshold for circle (per month)"
            id="6BXcdo"
            description="src/components/Forms/CreateCircleForm/Init.tsx"
          />
        }
        hasLabel
        required
        min={PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD}
        max={PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD}
        currency={PAYMENT_CURRENCY.HKD}
        name="amount"
        value={values.amount}
        error={touched.amount && errors.amount}
        onBlur={handleBlur}
        onChange={(e) => {
          const amount = e.target.valueAsNumber || 0
          const sanitizedAmount = Math.min(
            Math.floor(amount),
            PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD
          )

          // remove extra left pad 0
          if (inputRef.current) {
            inputRef.current.value = sanitizedAmount
          }
          setFieldValue('amount', sanitizedAmount)
        }}
        ref={inputRef}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          right={
            <>
              <Layout.Header.Title>
                <FormattedMessage defaultMessage="Create Circle" id="ESn43O" />
              </Layout.Header.Title>

              <Layout.Header.RightButton
                type="submit"
                form={formId}
                disabled={isSubmitting}
                text={
                  <FormattedMessage defaultMessage="Next Step" id="8cv9D4" />
                }
                loading={isSubmitting}
              />
            </>
          }
        />

        <Layout.Main.Spacing>{InnerForm}</Layout.Main.Spacing>
      </>
    )
  }

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Create Circle" id="ESn43O" />}
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />

            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default Init
