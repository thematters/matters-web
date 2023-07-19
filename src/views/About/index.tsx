import { Head } from '~/components'

import Footer from './Footer'
import Hero from './Hero'
import Intro from './Intro'
import JoinUs from './JoinUs'
import Stats from './Stats'
// import Team from './Team'
import Timeline from './Timeline'

const About = () => {
  return (
    <main>
      <Head title={{ id: 'about' }} />

      <Hero />
      <Intro />
      <Stats />
      <Timeline />
      {/* <Team /> */}
      <JoinUs />
      <Footer />
    </main>
  )
}

export default About
