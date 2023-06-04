import { VisuallyHidden } from '@reach/visually-hidden'
import Link from 'next/link'
import { useContext } from 'react'

import { PATHS } from '~/common/enums'
import { translate } from '~/common/utils'
import { Head, IconLogo, LanguageContext } from '~/components'

import Footer from '../About/Footer'
import Banner from './Banner'
import Features from './Features'
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

      <header className={`l-container ${styles.header}`}>
        <div className="l-row">
          <div className="l-col-full">
            <Link href={PATHS.HOME} legacyBehavior>
              <a className={styles.logo}>
                <VisuallyHidden>
                  <span>{translate({ id: 'discover', lang })}</span>
                </VisuallyHidden>
                <IconLogo />
              </a>
            </Link>
          </div>
        </div>
      </header>

      <Intro />
      <Steps />
      <Features />
      <Banner />
      <Footer />
    </main>
  )
}

export default Migration
