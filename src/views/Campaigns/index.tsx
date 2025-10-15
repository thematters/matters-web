import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { Head, Layout, Spacer, SpinnerBlock } from '~/components'

import Billboard from './Billboard'
import Feeds from './Feeds'
import Header from './Header'
import Portal from './Portal'

const DynamicOrganizers = dynamic(() => import('./Organizers'), {
  loading: () => <SpinnerBlock />,
  ssr: false,
})

const Campaigns = () => {
  const intl = useIntl()

  return (
    <Layout.Main
      aside={
        <>
          <Spacer size="sp78" />
          <Portal />
          <DynamicOrganizers />
          <Billboard />
        </>
      }
    >
      <Head
        image={IMAGE_INTRO.src}
        title={intl.formatMessage({
          defaultMessage: 'Events',
          id: 'JyfFVp',
          description: 'src/views/Campaigns/index.tsx',
        })}
      />
      <Header />
      <Feeds />
    </Layout.Main>
  )
}

export default Campaigns
