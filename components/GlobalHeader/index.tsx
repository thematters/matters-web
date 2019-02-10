import Link from 'next/link'

import IconLogo from '~/static/icons/logo.svg?sprite'

import styles from './styles.css'

export const GlobalHeader = () => (
  <header>
    <div className="l-row">
      <div className="container">
        <section className="left">
          <Link href="/" as="/">
            <a>
              <IconLogo height="20px" />
            </a>
          </Link>
        </section>

        <section className="right" />
      </div>
    </div>

    <style jsx>{styles}</style>
  </header>
)
