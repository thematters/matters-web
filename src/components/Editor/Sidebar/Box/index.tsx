import classNames from 'classnames'

import IconEdit from '@/public/static/icons/24px/edit.svg'
import { Button, Icon, TextIcon } from '~/components'

import styles from './styles.module.css'

interface BoxProps {
  icon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  rightButton?: React.ReactNode
  footerSpacing?: boolean
  borderColor?: 'campaignBlue'
}

const Box: React.FC<React.PropsWithChildren<BoxProps>> = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
  rightButton,
  footerSpacing = true,
  borderColor,
  children,
}) => {
  const boxClasses = classNames({
    [styles.box]: true,
    [styles.footerSpacing]: !!footerSpacing,
    [styles.campaignBlue]: borderColor === 'campaignBlue',
    'u-area-disable': disabled,
  })

  return (
    <section className={boxClasses}>
      <section className={styles.top}>
        <section className={styles.left}>
          <header className={styles.header}>
            <TextIcon icon={icon} size={14} weight="medium" spacing={8}>
              {title}
            </TextIcon>
          </header>

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </section>

        <section className={styles.right}>
          {rightButton}

          {!rightButton && onClick && (
            <Button
              onClick={onClick}
              bgActiveColor="greyLighter"
              spacing={[8, 8]}
              aria-haspopup="dialog"
              aria-label={title}
            >
              <Icon icon={IconEdit} color="grey" />
            </Button>
          )}
        </section>
      </section>
      {children}
    </section>
  )
}

export default Box
