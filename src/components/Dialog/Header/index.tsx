import {
  Button,
  Icon,
  // TextIcon, Translate,
  useResponsive
} from '~/components'

// import { TEXT } from '~/common/enums'

import styles from './styles.css'

interface HeaderProps {
  close: () => void
  rightButton?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ close, rightButton, children }) => {
  const isSmallUp = useResponsive({ type: 'sm-up' })()

  return (
    <header>
      <section className="left">
        <Button onClick={close} aria-label="關閉">
          {/* {!isSmallUp && (
            <TextIcon color="green" size="md">
              <Translate
                zh_hant={TEXT.zh_hant.cancel}
                zh_hans={TEXT.zh_hans.cancel}
              />
            </TextIcon>
          )} */}
          {isSmallUp && <Icon.CloseGreenMedium size="lg" />}
        </Button>
      </section>

      <h1 id="dialog-title">
        <span>{children}</span>
      </h1>

      {rightButton && <section className="right">{rightButton}</section>}

      <style jsx>{styles}</style>
    </header>
  )
}

export default Header
