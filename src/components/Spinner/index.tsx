import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'

import { ReactComponent as IconSpinner } from '@/public/static/icons/24px/spinner.svg'
import { TEST_ID } from '~/common/enums'
import { Icon, IconColor, IconSize, Translate } from '~/components'

import styles from './styles.module.css'

export const Spinner = ({
  color = 'greyLight',
  size = 'lg',
  noSpacing,
}: {
  color?: IconColor
  size?: IconSize
  noSpacing?: boolean
}) => {
  const spinnerClasses = classNames({
    'u-motion-spinner': true,
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
      <Icon icon={IconSpinner} color={color} size={size} />
    </div>
  )
}
