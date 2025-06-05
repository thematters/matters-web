import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Dialog } from '~/components'

import DonationTabs from '../Tabs'
import styles from './styles.module.css'

type Props = {
  currency: CURRENCY
  setCurrency: (currency: CURRENCY) => void
  onClose: () => void
}

export const DisableSupport = ({ currency, setCurrency, onClose }: Props) => {
  const isLikecoin = currency === CURRENCY.LIKE

  return (
    <>
      <DonationTabs currency={currency} setCurrency={setCurrency} />
      <section className={styles.container}>
        <section className={styles.content}>
          <section className={styles.info}>
            {isLikecoin && (
              <FormattedMessage
                defaultMessage="The author has not bound the LikeCoin wallet yet"
                id="J7hiLV"
              />
            )}
          </section>
          <Dialog.RoundedButton
            color="black"
            onClick={onClose}
            borderColor="greyLight"
            borderWidth="sm"
            textWeight="normal"
            borderActiveColor="grey"
            text={<FormattedMessage defaultMessage="Got it" id="NYTGIb" />}
          />
        </section>
      </section>
    </>
  )
}
