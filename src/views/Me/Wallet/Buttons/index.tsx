import { analytics } from '~/common/utils'
import { AddCreditDialog, Dialog, Translate, useFeatures } from '~/components'

import PayoutButton from './PayoutButton'
import styles from './styles.module.css'

interface ButtonsProps {
  canPayout: boolean
  hasStripeAccount: boolean
}

const Buttons: React.FC<ButtonsProps> = ({ canPayout, hasStripeAccount }) => {
  const features = useFeatures()
  return (
    <div className={styles.container}>
      <section className={styles.buttons}>
        <AddCreditDialog>
          {({ openDialog }) => (
            <Dialog.Footer.Button
              onClick={() => {
                openDialog()
                analytics.trackEvent('click_button', { type: 'top_up' })
              }}
              aria-haspopup="dialog"
            >
              <Translate id="topUp" />
            </Dialog.Footer.Button>
          )}
        </AddCreditDialog>

        {features.payout && (
          <PayoutButton
            disabled={!canPayout}
            hasStripeAccount={hasStripeAccount}
          />
        )}
      </section>
    </div>
  )
}

export default Buttons
