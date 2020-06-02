import { IconSpinner } from '~/components'

import styles from './styles.css'

export const Spinner = () => (
  <div className="spinner" aria-label="加載中">
    <IconSpinner color="grey-light" size="lg" />

    <style jsx>{styles}</style>
  </div>
)
