import classNames from 'classnames'

import { ReactComponent as IconEdit } from '@/public/static/icons/24px/edit.svg'
import { Button, Icon, TextIcon } from '~/components'

import styles from './styles.module.css'

interface BoxProps {
  icon: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  onClick?: () => any
  disabled?: boolean
  footerSpacing?: boolean
  borderColor?: 'freeWriteBlue'
}

const Box: React.FC<React.PropsWithChildren<BoxProps>> = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
  footerSpacing = true,
  borderColor,
  children,
}) => {
  const boxClasses = classNames({
    [styles.box]: true,
    [styles.footerSpacing]: !!footerSpacing,
    [styles.freeWriteBlue]: borderColor === 'freeWriteBlue',
    'u-area-disable': disabled,
  })

  return (
    <section className={boxClasses}>
      <header className={styles.header}>
        <TextIcon icon={icon} size={16} weight="medium" spacing={8}>
          {title}
        </TextIcon>

        {onClick && (
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
      </header>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {children}
    </section>
  )
}

export default Box
