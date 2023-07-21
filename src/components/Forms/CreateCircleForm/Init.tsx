import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
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
import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  useMutation,
} from '~/components'
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
  const [create] = useMutation<PutCircleMutation>(PUT_CIRCLE, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)
  const inputRef: React.RefObject<any> | null = useRef(null)
  // const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'create-circle-init-form'

  const intl = useIntl()
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
        name: validateCircleName(name, lang),
        displayName: validateCircleDisplayName(displayName, lang),
        amount: validateCircleAmount(amount, lang),
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

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        codes.forEach((c) => {
          if (c === 'NAME_EXISTS') {
            setFieldError(
              'name',
              intl.formatMessage({
                defaultMessage:
                  'This URL name has already been used, try another one',
                description: 'src/components/Forms/CreateCircleForm/Init.tsx',
              })
            )
          } else if (c === 'NAME_INVALID') {
            setFieldError(
              'name',
              intl.formatMessage({
                defaultMessage:
                  'Must be between 2-20 characters long. Only lowercase letters, numbers and underline are allowed.',
              })
            )
          } else if (c === 'DISPLAYNAME_INVALID') {
            setFieldError(
              'name',
              intl.formatMessage({
                defaultMessage: 'Must be between 2-12 characters long.',
              })
            )
          } else {
            setFieldError('name', messages[c])
          }
        })
      }
    },
  })

  const InnerForm = (
    <section className={styles.container}>
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Input
          label={<FormattedMessage defaultMessage="Circle Name" />}
          type="text"
          name="displayName"
          required
          placeholder={intl.formatMessage({
            defaultMessage: 'Enter the name of your Circle',
          })}
          value={values.displayName}
          error={touched.displayName && errors.displayName}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        <section className="displayNameInput">
          <Form.Input
            label={
              <FormattedMessage
                defaultMessage="Set the Circle URL (cannot be modified after creation)"
                description="src/components/Forms/CreateCircleForm/Init.tsx"
              />
            }
            type="text"
            name="name"
            required
            placeholder={intl.formatMessage({
              defaultMessage: 'Custom URL Name',
            })}
            value={values.name}
            error={touched.name && errors.name}
            onBlur={handleBlur}
            onChange={(e) => {
              const name = normalizeName(e.target.value)
              setFieldValue('name', name)
              return name
            }}
          />
        </section>

        <Form.AmountInput
          required
          min={PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD}
          max={PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD}
          currency={PAYMENT_CURRENCY.HKD}
          label={
            <FormattedMessage
              defaultMessage="Set threshold for circle (per month)"
              description="src/components/Forms/CreateCircleForm/Init.tsx"
            />
          }
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
    </section>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Next Step" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          right={
            <>
              <Layout.Header.Title id="circleCreation" />
              <Layout.Header.RightButton
                type="submit"
                form={formId}
                disabled={isSubmitting}
                text={<FormattedMessage defaultMessage="Next Step" />}
                loading={isSubmitting}
              />
            </>
          }
        />
        {InnerForm}
      </>
    )
  }

  return (
    <>
      <Dialog.Header
        title="circleCreation"
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
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
