import { Icon } from '~/components'

import styles from './styles.css'

export const Spinner = () => (
  <div className="spinner" aria-label="loading">
    <Icon.Spinner size="lg" />

    <style jsx>{styles}</style>
  </div>
)
