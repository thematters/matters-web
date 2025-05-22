import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useEffect, useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconStripeCard } from '@/public/static/icons/stripe-card.svg'
import { PAYMENT_PASSSWORD_LENGTH } from '~/common/enums'
import { parseFormSubmitErrors, validatePaymentPassword } from '~/common/utils'
import {
  Dialog,
  Form,
  Icon,
  SpinnerBlock,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import {
  DigestRichCirclePrivateFragment,
  DigestRichCirclePublicFragment,
  SubscribeCircleMutation,
} from '~/gql/graphql'

import { SUBSCRIBE_CIRCLE } from './gql'
import ContentHead from './Head'
import Hint from './Hint'
import styles from './styles.module.css'

interface FormProps {
  circle: DigestRichCirclePublicFragment & DigestRichCirclePrivateFragment
  cardLast4: string
  submitCallback: () => void
  switchToCardPayment: () => void
  switchToResetPassword: () => void
  closeDialog: () => void
}

interface FormValues {
  password: string
}

const Confirm: React.FC<FormProps> = ({
  circle,
  cardLast4,
  submitCallback,
  switchToCardPayment,
  switchToResetPassword,
  closeDialog,
}) => {
  const intl = useIntl()
  const formId = useId()

  const [subscribeCircle] = useMutation<SubscribeCircleMutation>(
    SUBSCRIBE_CIRCLE,
    undefined,
    { showToast: false }
  )

  const {
    errors,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setTouched,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ password }) =>
      _pickBy({
        password: validatePaymentPassword(password, intl),
      }),
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        await subscribeCircle({
          variables: { input: { id: circle.id, password } },
        })
        setSubmitting(false)
        submitCallback()
      } catch (error) {
        setSubmitting(false)
        const [messages, codes] = parseFormSubmitErrors(error as any)
        setFieldError('password', intl.formatMessage(messages[codes[0]]))
        setFieldValue('password', '', false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.PinInput
        length={PAYMENT_PASSSWORD_LENGTH}
        name="password"
        value={values.password}
        error={touched.password && errors.password}
        hint={
          <FormattedMessage
            defaultMessage="Enter a 6-digit payment password."
            id="OpeFTV"
          />
        }
        onChange={(value) => {
          const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
          setTouched({ password: true }, shouldValidate)
          setFieldValue('password', value, shouldValidate)
        }}
      />
    </Form>
  )

  useEffect(() => {
    if (values.password.length === PAYMENT_PASSSWORD_LENGTH) {
      handleSubmit()
    }
  }, [values.password])

  if (isSubmitting) {
    return (
      <Dialog.Content>
        <SpinnerBlock />
      </Dialog.Content>
    )
  }

  return (
    <>
      <Dialog.Header
        closeDialog={closeDialog}
        title={
          <FormattedMessage defaultMessage="Subscribe Circle" id="hG2cBH" />
        }
      />

      <Dialog.Content fixedHeight>
        <ContentHead circle={circle} />

        <section className={styles.currentCard}>
          <TextIcon
            icon={<Icon icon={IconStripeCard} size={24} />}
            color="grey"
            size={12}
            spacing={12}
          >
            •••• •••• •••• {cardLast4}
          </TextIcon>

          <button type="button" onClick={switchToCardPayment}>
            <TextIcon color="green" size={12}>
              <Translate zh_hant="更改" zh_hans="更改" />
            </TextIcon>
          </button>
        </section>

        <Hint />

        {InnerForm}
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={
              <FormattedMessage defaultMessage="Forget Password" id="N6PWfU" />
            }
            color="greyDarker"
            onClick={switchToResetPassword}
          />
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              onClick={closeDialog}
            />
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Forget Password"
                  id="N6PWfU"
                />
              }
              color="greyDarker"
              onClick={switchToResetPassword}
            />
          </>
        }
      />
    </>
  )
}

export default Confirm
