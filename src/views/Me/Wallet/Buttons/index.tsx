import { AddCreditDialog, Dialog, Translate, useFeatures } from '~/components'

import { analytics } from '~/common/utils'

import PayoutButton from './PayoutButton'
import styles from './styles.css'

interface ButtonsProps {
  canPayout: boolean
  hasStripeAccount: boolean
}

const Buttons: React.FC<ButtonsProps> = ({ canPayout, hasStripeAccount }) => {
  const features = useFeatures()
  return (
    <div className="container">
      <section className="buttons">
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

      <style jsx>{styles}</style>
    </div>
  )
}

export default Buttons
