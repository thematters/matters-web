import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import { IconSpinner16, Translate } from '~/components'

import styles from './styles.module.css'

export const Spinner = ({
  color = 'greyLight',
  noSpacing,
}: {
  color?: 'greyLight' | 'white'
  noSpacing?: boolean
}) => {
  const spinnerClasses = classNames({
    [styles.spinner]: true,
    [styles.noSpacing]: noSpacing,
  })

  return (
    <div
      className={spinnerClasses}
      data-test-id={TEST_ID.SPINNER}
      aria-busy="true"
      aria-live="polite"
    >
      <VisuallyHidden>
        <span>
          <Translate zh_hant="載入中…" zh_hans="加载中…" en="Loading..." />
        </span>
      </VisuallyHidden>
      <IconSpinner16 color={color} size="lg" />
    </div>
  )
}
