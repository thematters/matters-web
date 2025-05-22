import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconLeft } from '@/public/static/icons/24px/left.svg'
import {
  ERROR_CODES,
  REFERRAL_QUERY_REFERRAL_KEY,
  REFERRAL_STORAGE_REFERRAL_CODE,
} from '~/common/enums'
import {
  parseFormSubmitErrors,
  signupCallbackUrl,
  storage,
  validateEmail,
} from '~/common/utils'
import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
  AuthTabs,
  AuthWalletFeed,
  Dialog,
  Form,
  Icon,
  LanguageContext,
  Media,
  // ReCaptcha,
  TextIcon,
  useMutation,
  useRoute,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
// import { UserGroup } from '~/gql/graphql'
import { SendVerificationCodeMutation } from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: (email: string) => void
  gotoWalletConnect: (type: WalletType) => void
  closeDialog?: () => void

  authFeedType: AuthFeedType
  setAuthFeedType: (type: AuthFeedType) => void

  back: () => void
}

interface FormValues {
  email: string
}

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  gotoWalletConnect,
  closeDialog,
  authFeedType,
  setAuthFeedType,
  back,
}) => {
  const { lang } = useContext(LanguageContext)
  const formId = useId()

  const isInPage = purpose === 'page'

  const isNormal = authFeedType === 'normal'
  const isWallet = authFeedType === 'wallet'
  // const [turnstileToken, setTurnstileToken] = useState<string>()

  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined,
    {
      showToast: false,
    }
  )
  const intl = useIntl()
  const { getQuery } = useRoute()
  const referralCode =
    getQuery(REFERRAL_QUERY_REFERRAL_KEY) ||
    storage.get<{ referralCode: string }>(REFERRAL_STORAGE_REFERRAL_CODE)
      ?.referralCode ||
    undefined

  const {
    values,
    errors,
    touched,
    // handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
    },
    validateOnBlur: false,
    validateOnChange: true, // enable for signup form
    validate: ({ email }) =>
      _pickBy({
        email: validateEmail(email, intl, { allowPlusSign: false }),
      }),
    onSubmit: async ({ email }, { setFieldError, setSubmitting }) => {
      try {
        const redirectUrl = signupCallbackUrl(email, referralCode)
        await sendCode({
          variables: {
            input: {
              email,
              type: 'register',
              // token: turnstileToken,
              redirectUrl,
              language: lang,
            },
          },
        })

        setSubmitting(false)
        submitCallback(email)
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any)
        if (codes[0].includes(ERROR_CODES.FORBIDDEN_BY_STATE)) {
          setFieldError(
            'email',
            intl.formatMessage({
              defaultMessage: 'Unavailable',
              id: 'rADhX5',
              description: 'FORBIDDEN_BY_STATE',
            })
          )
        } else {
          setFieldError('email', intl.formatMessage(messages[codes[0]]))
        }
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<FormattedMessage defaultMessage="Email" id="sy+pv5" />}
        type="email"
        name="email"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Email',
          id: 'sy+pv5',
        })}
        hintSize="sm"
        hintAlign="center"
        hintSpace="baseLoose"
        value={values.email}
        error={touched.email && errors.email}
        // FIXME: handleBlur will cause the component to re-render
        // onBlur={handleBlur}
        onChange={handleChange}
        spacingBottom="base"
        autoFocus
      />

      {/* <ReCaptcha action="register" setToken={setTurnstileToken} /> */}
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={
        values.email === '' || errors.email !== undefined || isSubmitting
      }
      text={
        <FormattedMessage
          defaultMessage="Continue"
          id="wK4kLf"
          description="src/components/Forms/EmailSignUpForm/Init.tsx"
        />
      }
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Sign Up" id="39AHJm" />}
        hasSmUpTitle={false}
        leftBtn={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
            color="greyDarker"
            onClick={back}
          />
        }
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>
        <Media at="sm">{InnerForm}</Media>
        <Media greaterThan="sm">
          <AuthTabs
            purpose={purpose}
            type={authFeedType}
            setType={setAuthFeedType}
            normalText={
              <FormattedMessage defaultMessage="Sign Up" id="39AHJm" />
            }
          />
          {isNormal && <>{InnerForm}</>}
          {isWallet && <AuthWalletFeed submitCallback={gotoWalletConnect} />}
        </Media>
      </Dialog.Content>

      {isNormal && (
        <Dialog.Footer
          smUpBtns={
            <section className={styles.footerBtns}>
              <Dialog.TextButton
                text={
                  <TextIcon
                    icon={<Icon icon={IconLeft} size={20} />}
                    spacing={2}
                  >
                    <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                  </TextIcon>
                }
                color="greyDarker"
                onClick={back}
              />

              {SubmitButton}
            </section>
          }
        />
      )}
      {isWallet && !isInPage && (
        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}

export default Init
