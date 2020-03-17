import Link from 'next/link'

import { Head, Icon } from '~/components'
import Footer from '~/components/Standalone/Footer'

import { PATHS, TEXT } from '~/common/enums'

import Features from './Features'
import Goal from './Goal'
import Reports from './Reports'
import Slogan from './Slogan'
import styles from './styles.css'

const About = () => {
  return (
    <main>
      <Head title={{ id: 'about' }} />

      <header>
        <section className="l-row">
          <Link {...PATHS.HOME}>
            <a className="logo" aria-label={TEXT.zh_hant.discover}>
              <Icon.Logo />
            </a>
          </Link>
        </section>
      </header>

      <Slogan />
      <Goal />
      <Features />
      <Reports />
      <Footer />

      <style jsx>{styles}</style>
    </main>
  )
}

export default About
