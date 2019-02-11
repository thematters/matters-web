import Link from 'next/link'

import IconLogo from '~/static/icons/logo.svg?sprite'

import styles from './styles.css'

export const GlobalHeader = () => (
  <header>
    <div className="l-row">
      <div className="container">
        <section>
          <Link href="/" as="/">
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
