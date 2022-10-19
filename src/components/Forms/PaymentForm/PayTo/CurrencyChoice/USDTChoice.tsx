import { useContext } from 'react'
import { useAccount } from 'wagmi'

import {
  Button,
  CurrencyFormatter,
  IconUSDT40,
  IconUSDTActive40,
  TextIcon,
  Translate,
  useBalanceUSDT,
  ViewerContext,
} from '~/components'

import { PATHS, PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

interface FormProps {
  recipient: UserDonationRecipient
  switchToSetAmount: (c: CURRENCY) => void
  switchToWalletSelect: () => void
}

const USDTChoice: React.FC<FormProps> = ({
  recipient,
  switchToSetAmount,
  switchToWalletSelect,
}) => {
  const viewer = useContext(ViewerContext)
  const { address } = useAccount()

  const { data: balanceUSDTData } = useBalanceUSDT({})
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')

  return (
    <>
      {address && !!viewer.info.ethAddress && !!recipient.info.ethAddress && (
        <section
          role="button"
          className="item clickable"
          onClick={() => {
            switchToSetAmount(CURRENCY.USDT)
          }}
        >
          <TextIcon
            icon={<IconUSDTActive40 size="xl-m" />}
            size="md"
            spacing="xtight"
          >
            Tether
          </TextIcon>
          <CurrencyFormatter
            value={formatAmount(balanceUSDT)}
            currency={CURRENCY.USDT}
          />
        </section>
      )}

      {address && !recipient.info.ethAddress && (
        <section role="button" className="item">
          <TextIcon
            icon={<IconUSDT40 size="xl-m" />}
            size="md"
            spacing="xtight"
            color="grey"
          >
            Tether
          </TextIcon>
          <TextIcon size="md" color="grey">
            <Translate
              zh_hant="作者尚未啟用"
              zh_hans="作者尚未启用"
              en="The author has not opened"
            />
          </TextIcon>
        </section>
      )}

      {!address && (
        <section role="button" className="item">
          <TextIcon
            icon={<IconUSDT40 size="xl-m" color="grey" />}
            size="md"
            spacing="xtight"
            color="grey"
          >
            Tether
          </TextIcon>
          {!viewer.info.ethAddress && (
            <Button
              spacing={['xxtight', 'base']}
              borderColor="green"
              borderRadius="5rem"
              href={PATHS.ME_SETTINGS_CONNECT_WALLET}
            >
              <TextIcon color="green">
                <Translate
                  zh_hant="前往設定錢包"
                  zh_hans="前往设定钱包"
                  en="Go to set up wallet"
                />
              </TextIcon>
            </Button>
          )}
          {!!viewer.info.ethAddress && (
            <Button
              spacing={['xxtight', 'base']}
              borderColor="green"
              borderRadius="5rem"
              onClick={() => {
                switchToWalletSelect()
              }}
            >
              <TextIcon color="green">
                <Translate
                  zh_hant="連接錢包"
                  zh_hans="连接钱包"
                  en="Connect Wallet"
                />
              </TextIcon>
            </Button>
          )}
        </section>
      )}
      <style jsx>{styles}</style>
    </>
  )
}

export default USDTChoice
