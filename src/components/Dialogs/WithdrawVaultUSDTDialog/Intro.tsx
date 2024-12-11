import { FormattedMessage } from 'react-intl'

import { formatAmount } from '~/common/utils'
import { Dialog } from '~/components'

type IntroProps = {
  amount: number
  switchToConnectWallet: () => void
  closeDialog: () => void
}

const Intro: React.FC<IntroProps> = ({
  amount,
  switchToConnectWallet,
  closeDialog,
}) => {
  return (
    <>
      <Dialog.Header
        closeDialog={closeDialog}
        title={
          <FormattedMessage
            defaultMessage="Connect wallet and claim USDT"
            id="mm2UAM"
          />
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="Matters will send {amount} USDT to your connected wallet via a contract transaction (Matters will temporarily cover the transaction fee)."
              id="0zPaEM"
              values={{ amount: formatAmount(amount) }}
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
            onClick={closeDialog}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={
              <FormattedMessage
                defaultMessage="Connect and claim"
                id="C/4nS6"
              />
            }
            onClick={switchToConnectWallet}
          />
        }
      />
    </>
  )
}

export default Intro
