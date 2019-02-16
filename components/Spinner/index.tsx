import { Icon } from '~/components'

import ICON_SPINNER from '~/static/icons/spinner.svg?sprite'
import styles from './styles.css'

export const Spinner = () => (
  <div className="spinner" aria-label="loading">
    <Icon size="large" id={ICON_SPINNER.id} viewBox={ICON_SPINNER.viewBox} />
    <style jsx>{styles}</style>
  </div>
)
