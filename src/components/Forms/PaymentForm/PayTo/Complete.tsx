import { Avatar, Dialog, Icon, Translate } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

interface Props {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
}

const Complete: React.FC<Props> = ({ amount, currency, recipient }) => (
  <Dialog.Content hasGrow>
    <section className="complete-avatar">
      <Icon.Heart size="xl-s" color="red" />
      <div className="complete-avatar-outline">
        <Avatar size="lg" user={recipient} />
      </div>
    </section>

    <section className="complete-message">
      <Translate zh_hant="支持" zh_hans="支持" />
      <b>{` ${recipient.displayName} `}</b>
      <Translate zh_hant="的" zh_hans="的" />
      <b>{` ${currency} ${amount} `}</b>
      <br />
      <Translate zh_hant="已經支付成功" zh_hans="已经支付成功" />
      <br />
      <Translate
        zh_hant="感謝你對創作者的支持"
        zh_hans="感谢你对创作者的支持"
      />
    </section>
    <style jsx>{styles}</style>
  </Dialog.Content>
)

export default Complete
