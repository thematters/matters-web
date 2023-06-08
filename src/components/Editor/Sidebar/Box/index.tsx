import classNames from 'classnames'
import { useContext } from 'react'

import { TextId } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  IconEdit16,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

import styles from './styles.module.css'

interface BoxProps {
  icon: React.ReactNode
  title: TextId
  subtitle?: TextId
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
  const { lang } = useContext(LanguageContext)

  const boxClasses = classNames({
    [styles.box]: true,
    [styles.footerSpacing]: !!footerSpacing,
    'u-area-disable': disabled,
  })

  return (
    <section className={boxClasses}>
      <header className={styles.header}>
        <TextIcon icon={icon} size="md" weight="md" spacing="xtight">
          <Translate id={title} />
        </TextIcon>

        {onClick && (
          <Button
            onClick={onClick}
            bgActiveColor="greyLighter"
            spacing={['xtight', 'xtight']}
            aria-haspopup="dialog"
            aria-label={translate({ id: title, lang })}
          >
            <IconEdit16 color="grey" />
          </Button>
        )}
      </header>

      {subtitle && (
        <p className={styles.subtitle}>
          <Translate id={subtitle} />
        </p>
      )}

      {children}
    </section>
  )
}

export default Box
