import Link from 'next/link'

import { Avatar, Icon } from '~/components'

import { PATHS } from '~/common/enums'
import ICON_LOGO from '~/static/icons/logo.svg?sprite'
import styles from './styles.css'

const Logo = () => (
  <Link href={PATHS.HOMEPAGE.fs} as={PATHS.HOMEPAGE.url}>
    <a>
      <Icon
        id={ICON_LOGO.id}
        style={{ width: '97px', height: '20px' }}
        viewBox={ICON_LOGO.viewBox}
      />
    </a>
  </Link>
)

export const GlobalHeader = () => (
  <header>
    <div className="l-row">
      <div className="container">
        <section>
          <Logo />
        </section>

        <section>
          <Avatar size="small" />
        </section>
      </div>
    </div>

    <style jsx>{styles}</style>
  </header>
)
