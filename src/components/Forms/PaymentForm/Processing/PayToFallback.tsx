import { Dialog, Translate } from '~/components'

import IMAGE_PAYMENT_FAILURE from '@/public/static/images/payment-failure.png'

import styles from './styles.css'

interface Props {
  closeDialog: () => void
}

const PayToFallback: React.FC<Props> = ({ closeDialog }) => {
  return (
    <>
      <Dialog.Header
        leftButton={<span />}
        rightButton={<span />}
        title={'failureDonation'}
      />
      <Dialog.Content hasGrow>
        <section className="fallback-content">
          <p>
            Oops！
            <Translate
              zh_hant="交易出了點狀況"
              zh_hans="交易出了点状况"
              en="Something went wrong with the transaction"
            />
            ！
          </p>
          <p>
            <Translate
              zh_hant="網路連線異常，請檢查後重新嘗試"
              zh_hans="网路连线异常，请检查后重新尝试"
              en="SThe network connection is abnormal, please check and try again"
            />
          </p>
          <img src={IMAGE_PAYMENT_FAILURE.src} />
        </section>
      </Dialog.Content>
      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={closeDialog}
          bgColor="green"
          textColor="white"
        >
          <Translate
            zh_hant="回到作品頁，稍後再試"
            zh_hans="回到作品页，稍后再试"
            en="Return to work page, try again later"
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>
      <style jsx>{styles}</style>
    </>
  )
}

export default PayToFallback
