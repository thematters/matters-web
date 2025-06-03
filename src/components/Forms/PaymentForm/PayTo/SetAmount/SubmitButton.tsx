import { ApolloError } from '@apollo/client'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconOpenWallet from '@/public/static/icons/24px/open-wallet.svg'
import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import {
  Dialog,
  Icon,
  SetEmailDialog,
  TextIcon,
  ViewerContext,
} from '~/components'
import type { DialogTextButtonProps } from '~/components/Dialog/Buttons'
import { UserDonationRecipientFragment } from '~/gql/graphql'

type SubmitButtonProps = {
  mode: 'text' | 'rounded'
  currency: CURRENCY
  value: number
  formId: string
  recipient: UserDonationRecipientFragment

  isValid: boolean
  isSubmitting: boolean
  isExceededAllowance: boolean
  needReauthorize: boolean
  isBalanceInsufficient: boolean
  switchToAddCredit: () => void
  approving: boolean
  approveConfirming: boolean
  allowanceLoading: boolean

  approveWrite?: () => void

  walletBalanceError?: ApolloError
  walletBalanceLoading?: boolean
  refetchWalletBalance?: () => void
}

const WrapperButton: React.FC<
  Omit<DialogTextButtonProps, 'color'> & Pick<SubmitButtonProps, 'mode'>
> = ({ mode, ...restProps }) => {
  if (mode === 'text') {
    return <Dialog.TextButton {...restProps} />
  } else {
    return (
      <Dialog.RoundedButton
        {...restProps}
        color="white"
        bgColor="green"
        textSize={16}
        textWeight="normal"
      />
    )
  }
}

const HKDSubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  formId,
  isValid,
  isSubmitting,
  isBalanceInsufficient,
  switchToAddCredit,
  value,

  walletBalanceError,
  walletBalanceLoading,
  refetchWalletBalance,
}) => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  const isEmailVerified = !!viewer.info.emailVerified

  if (walletBalanceError && refetchWalletBalance) {
    return (
      <WrapperButton
        mode={mode}
        text={<FormattedMessage defaultMessage="Retry" id="62nsdy" />}
        form={formId}
        disabled={walletBalanceLoading}
        loading={walletBalanceLoading}
        onClick={refetchWalletBalance}
      />
    )
  }

  if (isBalanceInsufficient) {
    const props = {
      mode,
      text: (
        <FormattedMessage
          defaultMessage="Top up"
          id="hAyhzq"
          description="SUPPORT_HKD"
        />
      ),
      form: formId,
    }
    return (
      <>
        <SetEmailDialog>
          {({ openDialog }) => {
            return (
              <WrapperButton
                type="button"
                onClick={
                  hasEmail && isEmailVerified ? switchToAddCredit : openDialog
                }
                {...props}
              />
            )
          }}
        </SetEmailDialog>
      </>
    )
  }

  return (
    <WrapperButton
      mode={mode}
      text={<FormattedMessage defaultMessage="Next" id="9+Ddtu" />}
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting || value <= 0}
      loading={isSubmitting}
    />
  )
}

const LIKESubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  formId,
  isValid,
  isSubmitting,
  value,
}) => {
  return (
    <>
      {/* {recipient.liker.likerId && (
        <CivicLikerButton likerId={recipient.liker.likerId} />
      )} */}

      <WrapperButton
        mode={mode}
        text={<FormattedMessage defaultMessage="Next" id="9+Ddtu" />}
        type="submit"
        form={formId}
        disabled={!isValid || isSubmitting || value <= 0}
        loading={isSubmitting}
      />
    </>
  )
}

const USDTSubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  value,
  formId,
  isValid,
  isSubmitting,
  isExceededAllowance,
  needReauthorize,
  approving,
  approveConfirming,
  allowanceLoading,
  approveWrite,
}) => {
  if (isExceededAllowance) {
    return (
      <WrapperButton
        mode={mode}
        text={
          <TextIcon icon={<Icon icon={IconOpenWallet} size={20} />}>
            {needReauthorize ? (
              <FormattedMessage
                defaultMessage="Authorize in Wallet"
                description="REAUTHORIZE"
                id="XqTMgg"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Authorize in Wallet"
                id="0PpH2v"
              />
            )}
          </TextIcon>
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

  return (
    <WrapperButton
      mode={mode}
      text={<FormattedMessage defaultMessage="Next" id="9+Ddtu" />}
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting || value <= 0}
      loading={isSubmitting}
    />
  )
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
