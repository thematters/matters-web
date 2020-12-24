import { IconSpinner16 } from '~/components'

import styles from './styles.css'

export const Spinner = () => (
  <div className="spinner" aria-label="加載中">
    <IconSpinner16 color="grey-light" size="lg" />

    <style jsx>{styles}</style>
  </div>
)
