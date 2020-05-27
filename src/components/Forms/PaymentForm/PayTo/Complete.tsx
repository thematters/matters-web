import { useEffect } from 'react'

import { Avatar, Dialog, Icon, Translate } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

interface Props {
  amount: number
  callback?: () => void
  currency: CURRENCY
  recipient: UserDonationRecipient
}

const Complete: React.FC<Props> = ({
  amount,
  callback,
  currency,
  recipient,
}) => {
  useEffect(() => {
    if (callback) {
      callback()
    }
  }, [])

  return (
    <Dialog.Content hasGrow>
      <section className="complete-avatar">
        <Icon.Heart size="xl-m" color="red" />
        <div className="complete-avatar-outline">
          <Avatar size="lg" user={recipient} />
        </div>
      </section>

      <section className="complete-message">
        <b>{`${currency} ${amount} `}</b>
        <Translate zh_hant="支持" zh_hans="支持" />
        <b>{` ${recipient.displayName} `}</b>
        <br />
        <Translate zh_hant="已經成功送出！" zh_hans="已经成功送出！" />
      </section>
      <style jsx>{styles}</style>
    </Dialog.Content>
  )
}

export default Complete
