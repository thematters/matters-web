import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { waitForTransaction } from 'wagmi/actions'

import { WALLET_ERROR_MESSAGES } from '~/common/enums'
import {
  Dialog,
  IconOpenWallet20,
  LanguageContext,
  TextIcon,
  useAllowanceUSDT,
  useApproveUSDT,
} from '~/components'

import styles from './styles.module.css'

interface ApproveUsdtContractProps {
  submitCallback: () => void
}

const ApproveUsdtContract: React.FC<ApproveUsdtContractProps> = ({
  submitCallback,
}) => {
  const { lang } = useContext(LanguageContext)
  const [approveConfirming, setApproveConfirming] = useState(false)
  const {
    data: allowanceData,
    refetch: refetchAllowanceData,
    isLoading: allowanceLoading,
    error: allowanceError,
  } = useAllowanceUSDT()
  const {
    data: approveData,
    isLoading: approving,
    write: approveWrite,
    error: approveError,
  } = useApproveUSDT()

  useEffect(() => {
    const allowanceUSDT = allowanceData || 0n
    if (allowanceUSDT > 0n) {
      submitCallback()
    }
  }, [allowanceData])

  // USDT approval
  useEffect(() => {
    ;(async () => {
      if (approveData) {
        setApproveConfirming(true)
        await waitForTransaction({ hash: approveData.hash })
        refetchAllowanceData()
        setApproveConfirming(false)
      }
    })()
  }, [approveData])

  return (
    <section className={styles.container}>
      <section className={styles.content}>
        <section className={styles.title}>
          <FormattedMessage
            defaultMessage="Allow to use USDT in the wallet"
            id="OA3RuB"
            description="src/components/Forms/PaymentForm/ApproveUsdtContract/index.tsx"
          />
        </section>
        <section className={styles.info}>
          <FormattedMessage
            defaultMessage="Please confirm authorization in the wallet dialog.{br}Once confirmed, support steps can begin."
            id="YAIXL4"
            description="src/components/Forms/PaymentForm/ApproveUsdtContract/index.tsx"
            values={{ br: <br /> }}
          />
        </section>
        <Dialog.RoundedButton
          color="white"
          bgColor="green"
          onClick={approveWrite}
          textWeight="normal"
          textSize="md"
          text={
            <TextIcon icon={<IconOpenWallet20 size="mdS" />}>
              <FormattedMessage
                defaultMessage="Go to allow"
                id="wBpJLd"
                description="src/components/Forms/PaymentForm/ApproveUsdtContract/index.tsx"
              />
            </TextIcon>
          }
          loading={approving || approveConfirming || allowanceLoading}
        />

        {(allowanceError || approveError) && (
          <section className={styles.error}>
            {WALLET_ERROR_MESSAGES[lang].unknown}
          </section>
        )}
      </section>
    </section>
  )
}

export default ApproveUsdtContract
