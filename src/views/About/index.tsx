import { useIntl } from 'react-intl'

import { Head } from '~/components'

import Footer from './Footer'
import Hero from './Hero'
import Intro from './Intro'
import JoinUs from './JoinUs'
import Stats from './Stats'
// import Team from './Team'
import Timeline from './Timeline'

const About = () => {
  const intl = useIntl()
  return (
    <main>
      <Head
        title={intl.formatMessage({ defaultMessage: 'About Us', id: 'ZjDH42' })}
      />

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
