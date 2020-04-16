import Link from 'next/link'
import { useContext } from 'react'

import { Head, Icon, LanguageContext } from '~/components'
import Footer from '~/components/Standalone/Footer'

import { PATHS, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import Banner from './Banner'
import Features from './Features'
import Intro from './Intro'
import Steps from './Steps'
import styles from './styles.css'

const Migration = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <main>
      <Head
        title={translate({
          zh_hant: '三個步驟，立即搬家到 Matters',
          zh_hans: '三个步骤，立即搬家到 Matters',
          lang,
        })}
        description={translate({
          zh_hant: '我正在搬家到 Matters，邀請你一起來',
          zh_hans: '我正在搬家到 Matters，邀请你一起来',
          lang,
        })}
      />

      <header>
        <section className="l-row">
          <Link href={PATHS.HOME}>
            <a className="logo" aria-label={TEXT.zh_hant.discover}>
              <Icon.Logo />
            </a>
          </Link>
        </section>
      </header>

      <Intro />
      <Steps />
      <Features />
      <Banner />
      <Footer />

      <style jsx>{styles}</style>
    </main>
  )
}

export default Migration
