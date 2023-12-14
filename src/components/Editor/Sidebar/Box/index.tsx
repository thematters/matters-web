import classNames from 'classnames'

import { Button, IconEdit16, TextIcon } from '~/components'

import styles from './styles.module.css'

interface BoxProps {
  icon: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  onClick?: () => any
  disabled?: boolean
  footerSpacing?: boolean
}

const Box: React.FC<React.PropsWithChildren<BoxProps>> = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
  footerSpacing = true,
  children,
}) => {
  const boxClasses = classNames({
    [styles.box]: true,
    [styles.footerSpacing]: !!footerSpacing,
    'u-area-disable': disabled,
  })

  return (
    <section className={boxClasses}>
      <header className={styles.header}>
        <TextIcon icon={icon} size="md" weight="md" spacing="xtight">
          {title}
        </TextIcon>

        {onClick && (
          <Button
            onClick={onClick}
            bgActiveColor="greyLighter"
            spacing={['xtight', 'xtight']}
            aria-haspopup="dialog"
            aria-label={title}
          >
            <IconEdit16 color="grey" />
          </Button>
        )}
      </header>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {children}
    </section>
  )
}

export default Box
