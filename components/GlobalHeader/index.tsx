import Link from 'next/link'

import IconLogo from '~/static/icons/logo.svg?sprite'

import { PATHS } from '~/common/enums'
import styles from './styles.css'

export const GlobalHeader = () => (
  <header>
    <div className="l-row">
      <div className="container">
        <section>
          <Link href={PATHS.HOMEPAGE.fs} as={PATHS.HOMEPAGE.url}>
            <a>
              <IconLogo height="20px" />
            </a>
          </Link>
        </section>

        <section />
      </div>
    </div>

    <style jsx>{styles}</style>
  </header>
)
