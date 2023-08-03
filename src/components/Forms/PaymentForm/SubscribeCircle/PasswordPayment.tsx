import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconStripeCard } from '@/public/static/icons/stripe-card.svg'
import { PAYMENT_PASSSWORD_LENGTH } from '~/common/enums'
import { parseFormSubmitErrors, validatePaymentPassword } from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Spinner,
  TextIcon,
  Translate,
  useMutation,
  withIcon,
} from '~/components'
import {
  DigestRichCirclePrivateFragment,
  DigestRichCirclePublicFragment,
  SubscribeCircleMutation,
} from '~/gql/graphql'

import { SUBSCRIBE_CIRCLE } from './gql'
import Head from './Head'
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
  const formId = 'subscirbe-circle-form'

  const { lang } = useContext(LanguageContext)
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
        password: validatePaymentPassword(password, lang),
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
        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('password', messages[codes[0]])
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
        hint={<Translate id="hintPaymentPassword" />}
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
        <Spinner />
      </Dialog.Content>
    )
  }

  return (
    <>
      <Dialog.Header closeDialog={closeDialog} title="subscribeCircle" />

      <Dialog.Content fixedHeight>
        <Head circle={circle} />

        <section className={styles.currentCard}>
          <TextIcon
            icon={withIcon(IconStripeCard)({ size: 'md' })}
            color="grey"
            size="xs"
            spacing="tight"
          >
            •••• •••• •••• {cardLast4}
          </TextIcon>

          <button type="button" onClick={switchToCardPayment}>
            <TextIcon color="green" size="xs">
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
            text={<Translate id="forgetPassword" />}
            color="greyDarker"
            onClick={switchToResetPassword}
          />
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Cancel" />}
              onClick={closeDialog}
            />
            <Dialog.TextButton
              text={<Translate id="forgetPassword" />}
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
