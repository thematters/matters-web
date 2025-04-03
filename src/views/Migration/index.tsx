import { useIntl } from 'react-intl'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { Head } from '~/components'

import Footer from '../About/Footer'
import Banner from './Banner'
import Features from './Features'
import Hero from './Hero'
import Intro from './Intro'
import Steps from './Steps'
import styles from './styles.module.css'

const Migration = () => {
  const intl = useIntl()

  return (
    <main className={styles.main}>
      <Head
        title={intl.formatMessage({
          defaultMessage: '3 steps, migrate to Matters immediately',
          id: 'uQrkG8',
        })}
        description={intl.formatMessage({
          defaultMessage:
            'I am migrating to Matters, and I invite you to come along',
          id: '0/gRer',
        })}
        image={IMAGE_INTRO.src}
      />

      <Hero />
      <Intro />
      <Steps />
      <Features />
      <Banner />
      <Footer />
    </main>
  )
}

export default Migration
