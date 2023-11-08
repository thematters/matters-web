import { VisuallyHidden } from '@reach/visually-hidden'

import { TEST_ID } from '~/common/enums'
import { IconSpinner16, Translate } from '~/components'

import styles from './styles.module.css'

export const Spinner = () => {
  return (
    <div
      className={styles.spinner}
      data-test-id={TEST_ID.SPINNER}
      aria-busy="true"
      aria-live="polite"
    >
      <VisuallyHidden>
        <span>
          <Translate zh_hant="載入中…" zh_hans="加载中…" en="Loading..." />
        </span>
      </VisuallyHidden>
      <IconSpinner16 color="greyLight" size="lg" />
    </div>
  )
}

export const SpinnerWhite = () => {
  return (
    <div
      className={styles.spinner}
      data-test-id={TEST_ID.SPINNER}
      aria-busy="true"
      aria-live="polite"
    >
      <VisuallyHidden>
        <span>
          <Translate zh_hant="載入中…" zh_hans="加载中…" en="Loading..." />
        </span>
      </VisuallyHidden>
      <IconSpinner16 color="white" size="lg" />
    </div>
  )
}
