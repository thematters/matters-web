import { useDisconnect } from 'wagmi'

import IconInfo from '@/public/static/icons/24px/information.svg'
import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Button, Icon, TextIcon, Translate } from '~/components'

import CurrencyIndicator from './CurrencyIndicator'
import styles from './styles.module.css'
import WhyOptimismDialog from './WhyOptimismDialog'

type SetAmountHeaderProps = {
  currency: CURRENCY
  isConnectedAddress: boolean
  isUnsupportedNetwork: boolean
  targetChainName: string
  switchToCurrencyChoice: () => void
  switchToTargetNetwork: () => void
}

const SetAmountHeader: React.FC<SetAmountHeaderProps> = ({
  currency,
  isConnectedAddress,
  isUnsupportedNetwork,
  targetChainName,
  switchToCurrencyChoice,
  switchToTargetNetwork,
}) => {
  const { disconnect } = useDisconnect()

  const isUSDT = currency === CURRENCY.USDT

  return (
    <section className={styles.setAmountHeader}>
      <CurrencyIndicator
        currency={currency}
        switchToCurrencyChoice={switchToCurrencyChoice}
      />

      <section>
        {isUSDT && !isConnectedAddress && (
          <Button onClick={() => disconnect()}>
            <TextIcon size={12} decoration="underline" color="greyDark">
              <Translate
                zh_hant="切換錢包地址"
                zh_hans="切换钱包地址"
                en="Change Address"
              />
            </TextIcon>
          </Button>
        )}
        {isUSDT && isConnectedAddress && (
          <>
            <>
              {isUnsupportedNetwork ? (
                <Button onClick={switchToTargetNetwork}>
                  <TextIcon size={12} decoration="underline" color="greyDark">
                    <Translate
                      zh_hant="切換到 "
                      zh_hans="切换到 "
                      en="Switch to "
                    />
                    {targetChainName}
                  </TextIcon>
                </Button>
              ) : (
                <TextIcon size={12} color="black">
                  {targetChainName}
                </TextIcon>
              )}
            </>

            <WhyOptimismDialog>
              {({ openDialog }) => (
                <Button onClick={openDialog}>
                  <TextIcon
                    icon={<Icon icon={IconInfo} size={24} color="grey" />}
                  />
                </Button>
              )}
            </WhyOptimismDialog>
          </>
        )}
      </section>
    </section>
  )
}

export default SetAmountHeader
