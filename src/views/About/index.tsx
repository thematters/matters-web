import { Head } from '~/components'

import Footer from './Footer'
import Hero from './Hero'
import Intro from './Intro'
import styles from './styles.css'

const About = () => {
  return (
    <main>
      <Head title={{ id: 'about' }} />

      <Hero />
      <Intro />
      <Footer />

      <style jsx>{styles}</style>
    </main>
  )
}

export default About
