import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDisconnect } from 'wagmi'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import {
  BindEmailHintDialog,
  Dialog,
  Translate,
  ViewerContext,
} from '~/components'
import type { DialogTextButtonProps } from '~/components/Dialog/Buttons'
import { UserDonationRecipientFragment } from '~/gql/graphql'

type SubmitButtonProps = {
  mode: 'text' | 'rounded'
  currency: CURRENCY
  formId: string
  recipient: UserDonationRecipientFragment

  isValid: boolean
  isSubmitting: boolean
  isBalanceInsufficient: boolean
  isConnectedAddress: boolean
  isUnsupportedNetwork: boolean
  isSwitchingNetwork: boolean
  targetChainName: string
  allowanceUSDT: bigint
  approving: boolean
  approveConfirming: boolean
  allowanceLoading: boolean

  approveWrite?: () => void
  switchToTargetNetwork: () => void
  switchToCurrencyChoice: () => void
  switchToAddCredit: () => void
  back: () => void
}

const WrapperButton: React.FC<
  Omit<DialogTextButtonProps, 'color'> & Pick<SubmitButtonProps, 'mode'>
> = ({ mode, ...restProps }) => {
  if (mode === 'text') {
    return <Dialog.TextButton {...restProps} />
  } else {
    return <Dialog.RoundedButton {...restProps} />
  }
}

const HKDSubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  formId,
  isValid,
  isSubmitting,
  isBalanceInsufficient,
  switchToAddCredit,
}) => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  if (isBalanceInsufficient) {
    const props = {
      mode,
      text: 'topUp',
      form: formId,
    }
    return (
      <>
        <BindEmailHintDialog>
          {({ openDialog }) => {
            return (
              <WrapperButton
                type="button"
                onClick={hasEmail ? switchToAddCredit : openDialog}
                {...props}
              />
            )
          }}
        </BindEmailHintDialog>
      </>
    )
  }

  return (
    <WrapperButton
      mode={mode}
      text={<FormattedMessage defaultMessage="Next Step" />}
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting || isBalanceInsufficient}
      loading={isSubmitting}
    />
  )
}

const LIKESubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  formId,
  recipient,
  isValid,
  isSubmitting,
  isBalanceInsufficient,
}) => {
  return (
    <>
      {/* {recipient.liker.likerId && (
        <CivicLikerButton likerId={recipient.liker.likerId} />
      )} */}

      <WrapperButton
        mode={mode}
        text={<FormattedMessage defaultMessage="Next Step" />}
        type="submit"
        form={formId}
        disabled={!isValid || isSubmitting || isBalanceInsufficient}
        loading={isSubmitting}
      />
    </>
  )
}

const USDTSubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  formId,
  isValid,
  isSubmitting,
  isBalanceInsufficient,
  isConnectedAddress,
  isUnsupportedNetwork,
  isSwitchingNetwork,
  targetChainName,
  allowanceUSDT,
  approving,
  approveConfirming,
  allowanceLoading,
  approveWrite,
  switchToTargetNetwork,
}) => {
  const { disconnect } = useDisconnect()

  if (!isConnectedAddress) {
    return (
      <WrapperButton
        mode={mode}
        text={
          <Translate
            zh_hant="重新連接錢包"
            zh_hans="重新连接钱包"
            en="Reconnect Wallet"
          />
        }
        onClick={() => {
          disconnect()
        }}
      />
    )
  }

  if (isUnsupportedNetwork) {
    return (
      <WrapperButton
        mode={mode}
        text={
          <>
            <Translate zh_hant="切換到 " zh_hans="切换到 " en="Switch to " />
            {targetChainName}
          </>
        }
        onClick={switchToTargetNetwork}
        loading={isSwitchingNetwork}
      />
    )
  }

  if (!isUnsupportedNetwork && allowanceUSDT <= 0n) {
    return (
      <WrapperButton
        mode={mode}
        text={
          <Translate
            zh_hant="首次需確認授權後繼續"
            zh_hans="首次需确认授权后继续"
            en="Approve to continue"
          />
        }
        loading={approving || approveConfirming || allowanceLoading}
        onClick={() => {
          if (approveWrite) {
            approveWrite()
          }
        }}
      />
    )
  }

  if (!isUnsupportedNetwork && allowanceUSDT > 0n) {
    return (
      <WrapperButton
        mode={mode}
        text={<FormattedMessage defaultMessage="Next Step" />}
        type="submit"
        form={formId}
        disabled={!isValid || isSubmitting || isBalanceInsufficient}
        loading={isSubmitting}
      />
    )
  }

  return null
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const isUSDT = props.currency === CURRENCY.USDT
  const isHKD = props.currency === CURRENCY.HKD
  const isLIKE = props.currency === CURRENCY.LIKE

  if (isUSDT) {
    return <USDTSubmitButton {...props} />
  }

  if (isHKD) {
    return <HKDSubmitButton {...props} />
  }

  if (isLIKE) {
    return <LIKESubmitButton {...props} />
  }

  return null
}

export default SubmitButton
