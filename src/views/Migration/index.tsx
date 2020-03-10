import { useContext, useEffect } from 'react'

import { Head } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import Footer from '~/components/Standalone/Footer'

import Banner from './Banner'
import Features from './Features'
import Intro from './Intro'
import Steps from './Steps'
import styles from './styles.css'

const Migration = () => {
  const { updateHeaderState } = useContext(HeaderContext)

  useEffect(() => {
    updateHeaderState({ type: 'migration', bgColor: 'transparent' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  return (
    <main>
      <Head title={{ id: 'migration' }} />

      <article>
        <Intro />
        <Steps />
        <Features />
        <Banner />
        <Footer />
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default Migration
