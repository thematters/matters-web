import gql from 'graphql-tag'

import {
  Dialog,
  Form, // Layout,
  Translate,
  useMutation,
} from '~/components'

import { GenerateSigningMessage } from './__generated__/GenerateSigningMessage'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
}

const GENERATE_SIGNING_MESSAGE = gql`
  mutation GenerateSigningMessage($address: String!) {
    generateSigningMessage(address: $address) {
      nonce
      signingMessage
      createdAt
      expiredAt
    }
  }
`

const ConnectWallet: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const formId = 'login-sign-up-connect-wallet-form'

  const [generateSigningMessage] = useMutation<GenerateSigningMessage>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    {
      showToast: false,
    }
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      // disabled={!isValid || isSubmitting}
      text={<Translate id="nextStep" />}
      // loading={isSubmitting}
    />
  )

  const InnerForm = (
    <Form id={formId} onSubmit={submitCallback}>
      <div>Connect Wallet</div>
      <Form.List spacing="xloose">
        <Form.List.Item
          title={
            <Translate
              zh_hant="連接 Metamask 錢包"
              zh_hans="連接 Metamask 錢包"
              en="connect Metamask"
            />
          }
          onClick={async () => {
            const res = await window.ethereum.request({
              method: 'eth_requestAccounts',
            })
            console.log('connect metamask:', res)
            const address = res[0]
            const res2 = await generateSigningMessage({
              variables: { address },
            })
            const signingMessage =
              res2?.data?.generateSigningMessage?.signingMessage
            const nonce = res2?.data?.generateSigningMessage?.nonce
            console.log('got sign message:', res2, nonce, signingMessage)
            const signature = await window.ethereum.request({
              method: 'personal_sign',
              params: [
                signingMessage,
                address, // .toLowerCase(),
              ],
            }) // .then(console.log)
            console.log('signature:', signature)
          }}
        />
        <Form.List.Item
          title={
            <Translate
              zh_hant="連接 WalletConnect"
              zh_hans="連接 WalletConnect"
              en="connect WalletConnect"
            />
          }
          onClick={() => {
            console.log('connect via WalletConnect')
          }}
        />
      </Form.List>
    </Form>
  )

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="loginSignUp"
          closeDialog={closeDialog}
          // left={<Layout.Header.BackButton />}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default ConnectWallet
