import { useContext } from 'react'

import {
  AddCreditDialog,
  Dialog,
  FeaturesContext,
  Translate,
} from '~/components'

import { analytics } from '~/common/utils'

import PayoutButton from './PayoutButton'
import styles from './styles.css'

interface ButtonsProps {
  canPayout: boolean
  hasStripeAccount: boolean
}

const Buttons: React.FC<ButtonsProps> = ({ canPayout, hasStripeAccount }) => {
  const features = useContext(FeaturesContext)
  return (
    <section className="l-row">
      <div className="l-col-4 l-col-sm-4 l-offset-sm-2 l-col-md-5 l-offset-md-2 l-col-lg-6 l-offset-lg-3">
        <section className="buttons">
          <AddCreditDialog>
            {({ open }) => (
              <Dialog.Footer.Button
                onClick={() => {
                  open()
                  analytics.trackEvent('click_button', { type: 'top_up' })
                }}
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

      <style jsx>{styles}</style>
    </section>
  )
}

export default Buttons
