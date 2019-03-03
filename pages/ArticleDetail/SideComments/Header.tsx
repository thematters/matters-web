import { DrawerConsumer } from '~/components/Drawer'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import styles from './styles.css'

const CloseButton = () => (
  <DrawerConsumer>
    {({ close }) => (
      <button type="button" onClick={() => close()}>
        <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} size="large" />
      </button>
    )}
  </DrawerConsumer>
)

const Header = () => (
  <header>
    <h2>
      <Translate zh_hant="評論" zh_hans="评论" />
    </h2>

    <CloseButton />

    <style jsx>{styles}</style>
  </header>
)

export default Header
