import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { parseFormSubmitErrors, validateEmail } from '~/common/utils'
import { WalletType } from '~/common/utils'
import {
  AuthFeedType,
  AuthTabs,
  AuthWalletFeed,
  Dialog,
  Form,
  IconLeft20,
  LanguageContext,
  Media,
  ReCaptchaContext,
  TextIcon,
  useMutation,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { SendVerificationCodeMutation } from '~/gql/graphql'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: (email: string) => void
  gotoEmailLogin: () => void
  gotoWalletConnect: (type: WalletType) => void
  closeDialog?: () => void
  back: () => void
}

interface FormValues {
  email: string
}

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  gotoEmailLogin,
  gotoWalletConnect,
  closeDialog,
  back,
}) => {
  const { lang } = useContext(LanguageContext)
  const formId = 'email-sign-up-init-form'

  const isInPage = purpose === 'page'

  const [authTypeFeed, setAuthTypeFeed] = useState<AuthFeedType>('normal')
  const isNormal = authTypeFeed === 'normal'
  const isWallet = authTypeFeed === 'wallet'
  const { token, refreshToken } = useContext(ReCaptchaContext)

  // const { token, refreshToken } = useContext(ReCaptchaContext)
  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined,
    {
      showToast: false,
    }
  )
  const intl = useIntl()
  const {
    values,
    errors,
    touched,
    handleBlur,
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
        email: validateEmail(email, lang, { allowPlusSign: false }),
      }),
    onSubmit: async ({ email }, { setFieldError, setSubmitting }) => {
      try {
        await sendCode({
          variables: {
            input: { email, type: 'register', token },
          },
        })

        setSubmitting(false)
        submitCallback(email)
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any)
        setFieldError('email', intl.formatMessage(messages[codes[0]]))

        if (refreshToken) {
          refreshToken()
        }
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<FormattedMessage defaultMessage="Email" />}
        type="email"
        name="email"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'Email',
        })}
        hintSize="sm"
        hintAlign="center"
        hintSpace="baseLoose"
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        spacingBottom="base"
        autoFocus
      />
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
          description="src/components/Forms/EmailSignUpForm/Init.tsx"
        />
      }
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Sign Up" />}
        hasSmUpTitle={false}
        leftBtn={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Back" />}
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
            type={authTypeFeed}
            setType={setAuthTypeFeed}
            normalText={<FormattedMessage defaultMessage="Sign Up" />}
          />
          {isNormal && <>{InnerForm}</>}
          {isWallet && <AuthWalletFeed submitCallback={gotoWalletConnect} />}
        </Media>
      </Dialog.Content>

      {isNormal && (
        <Dialog.Footer
          smUpContentNoSpacingBottom={isInPage}
          smUpSpaceBetween
          smUpBtns={
            <>
              <Dialog.TextButton
                text={
                  <TextIcon icon={<IconLeft20 size="mdS" />} spacing="xxxtight">
                    <FormattedMessage defaultMessage="Back" />
                  </TextIcon>
                }
                color="greyDarker"
                onClick={back}
              />

              {SubmitButton}
            </>
          }
        />
      )}
      {isWallet && !isInPage && (
        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Close" />}
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}

export default Init
