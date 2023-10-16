import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Head, LanguageContext } from '~/components'

import Footer from '../About/Footer'
import Banner from './Banner'
import Features from './Features'
import Hero from './Hero'
import Intro from './Intro'
import Steps from './Steps'
import styles from './styles.module.css'

const Migration = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <main className={styles.main}>
      <Head
        title={translate({
          zh_hant: '三個步驟，立即搬家到 Matters',
          zh_hans: '三个步骤，立即搬家到 Matters',
          en: '3 steps, migrate to Matters immediately',
          lang,
        })}
        description={translate({
          zh_hant: '我正在搬家到 Matters，邀請你一起來',
          zh_hans: '我正在搬家到 Matters，邀请你一起来',
          en: 'I am migrating to Matters, and I invite you to come along',
          lang,
        })}
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
