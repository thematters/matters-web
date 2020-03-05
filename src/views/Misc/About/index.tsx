import { useContext, useEffect } from 'react'

import { Head } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import Footer from '~/components/Standalone/Footer'

import Features from './Features'
import Goal from './Goal'
import Reports from './Reports'
import Slogan from './Slogan'
import styles from './styles.css'

const About = () => {
  const { updateHeaderState } = useContext(HeaderContext)

  useEffect(() => {
    updateHeaderState({ type: 'about', bgColor: 'transparent' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  return (
    <main>
      <Head title={{ id: 'about' }} />

      <article>
        <Slogan />
        <Goal />
        <Features />
        <Reports />
        <Footer />
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default About
