import classNames from 'classnames'
import { useContext } from 'react'

import {
  Button,
  IconEdit16,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

import { TextId } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

interface BoxProps {
  icon: React.ReactNode
  title: TextId
  subtitle?: TextId
  onClick?: () => any
  disabled?: boolean
}

const Box: React.FC<React.PropsWithChildren<BoxProps>> = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
  children,
}) => {
  const { lang } = useContext(LanguageContext)

  const boxClasses = classNames({
    box: true,
    'u-area-disable': disabled,
  })

  return (
    <section className={boxClasses}>
      <header>
        <TextIcon icon={icon} size="md" weight="md" spacing="xtight">
          <Translate id={title} />
        </TextIcon>

        {onClick && (
          <Button
            onClick={onClick}
            bgActiveColor="grey-lighter"
            spacing={['xtight', 'xtight']}
            aria-label={translate({ id: title, lang })}
          >
            <IconEdit16 color="grey" />
          </Button>
        )}
      </header>

      {subtitle && (
        <p className="subtitle">
          <Translate id={subtitle} />
        </p>
      )}

      {children}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Box
