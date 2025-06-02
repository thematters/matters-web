import classNames from 'classnames'

import IconSpinner from '@/public/static/icons/24px/spinner.svg'
import { TEST_ID } from '~/common/enums'
import { Icon, IconColor, IconSize } from '~/components'

import styles from './styles.module.css'

type SpinnerProps = {
  color?: IconColor
  size?: IconSize
}

export const Spinner = ({ color, size }: SpinnerProps) => {
  return (
    <Icon
      aria-label="Loading..."
      data-test-id={TEST_ID.ICON_SPINNER}
      aria-busy="true"
      aria-live="polite"
      className="u-motion-spin"
      icon={IconSpinner}
      color={color}
      size={size}
    />
  )
}

export const SpinnerBlock = ({
  noSpacing,
  ...spinnerProps
}: { noSpacing?: boolean } & SpinnerProps) => {
  const classes = classNames({
    [styles.spinnerBlock]: true,
    [styles.noSpacing]: noSpacing,
  })

  return (
    <div className={classes}>
      <Spinner color="greyLight" size={32} {...spinnerProps} />
    </div>
  )
}
