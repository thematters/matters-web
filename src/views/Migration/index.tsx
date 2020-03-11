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

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
} = {
  zh_hant: {
    title: '三個步驟，立即搬家到 Matters',
    description:
      '想將過去發表在其他地方的文章，搬到 Matters，實現文章的永久保存？' +
      '從今天開始，只要三個步驟，就可以將你在 Medium 的文章輕鬆搬到 Matters。'
  },
  zh_hans: {
    title: '三个步骤，立即搬家到 Matters',
    description:
      '想将过去发表在其他地方的文章，搬到 Matters，实现文章的永久保存？' +
      '从今天开始，只要三个步骤，就可以将你在 Medium 的文章轻松搬到 Matters。'
  }
}

const Migration = () => {
  const { zh_hant, zh_hans } = texts
  const { lang } = useContext(LanguageContext)

  return (
    <main>
      <Head
        title={translate({
          zh_hant: zh_hant.title,
          zh_hans: zh_hans.title,
          lang
        })}
        description={translate({
          zh_hant: zh_hant.description,
          zh_hans: zh_hans.description,
          lang
        })}
      />

      <header>
        <section className="l-row">
          <Link {...PATHS.HOME}>
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
