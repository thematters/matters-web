import { useIntl } from 'react-intl'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { Head } from '~/components'

import Footer from './Footer'
import Hero from './Hero'
import Intro from './Intro'
import JoinUs from './JoinUs'
import Stats from './Stats'
import Timeline from './Timeline'

const About = () => {
  const intl = useIntl()
  return (
    <main>
      <Head
        title={intl.formatMessage({ defaultMessage: 'About Us', id: 'ZjDH42' })}
        image={IMAGE_INTRO.src}
      />

      <Hero />
      <Intro />
      <Stats />
      <Timeline />
      <JoinUs />
      <Footer />
    </main>
  )
}

export default About
