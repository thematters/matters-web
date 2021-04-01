import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'

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

import { parseFormSubmitErrors, validatePaymentPassword } from '~/common/utils'

import { ReactComponent as IconStripeCard } from '@/public/static/icons/stripe-card.svg'

import { SUBSCRIBE_CIRCLE } from './gql'
import Head from './Head'
import Hint from './Hint'
import styles from './styles.css'

import { DigestRichCirclePrivate } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePrivate'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { SubscribeCircle as SubscribeCircleType } from './__generated__/SubscribeCircle'

interface FormProps {
  circle: DigestRichCirclePublic & DigestRichCirclePrivate
  cardLast4: string
  submitCallback: () => void
  switchToCardPayment: () => void
  switchToResetPassword: () => void
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
}) => {
  const formId = 'subscirbe-circle-form'

  const { lang } = useContext(LanguageContext)
  const [subscribeCircle] = useMutation<SubscribeCircleType>(
    SUBSCRIBE_CIRCLE,
    undefined,
    { showToast: false }
  )

  const {
    errors,
    handleSubmit,
    isValid,
    isSubmitting,
    setFieldValue,
    setTouched,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
    },
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
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('password', messages[codes[0]])
        setFieldValue('password', '', false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.PinInput
        length={6}
        name="password"
        value={values.password}
        error={touched.password && errors.password}
        hint={<Translate id="hintPaymentPassword" />}
        onChange={(value) => {
          const shouldValidate = value.length === 6
          setTouched({ password: true }, shouldValidate)
          setFieldValue('password', value, shouldValidate)
        }}
      />
    </Form>
  )

  useEffect(() => {
    if (isValid && values.password) {
      handleSubmit()
    }
  }, [isValid])

  if (isSubmitting) {
    return (
      <Dialog.Content hasGrow>
        <Spinner />
      </Dialog.Content>
    )
  }

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          <Head circle={circle} />

          <section className="current-card">
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
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          bgColor="white"
          textColor="grey"
          onClick={switchToResetPassword}
        >
          <Translate id="forgetPassword" />？
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </>
  )
}

export default Confirm
