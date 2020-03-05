import { useContext, useEffect } from 'react'

import { Head, Layout } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import Features from './Features'
import Footer from './Footer'
import Goal from './Goal'
import Reports from './Reports'
import Slogan from './Slogan'

const About = () => {
  const { updateHeaderState } = useContext(HeaderContext)

  useEffect(() => {
    updateHeaderState({ type: 'about', bgColor: 'transparent' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  return (
    <Layout>
      <Head title={{ id: 'about' }} />

      <Slogan />
      <Goal />
      <Features />
      <Reports />
      <Footer />
    </Layout>
  )
}

export default About
