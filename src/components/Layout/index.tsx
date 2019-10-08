import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import { AnalyticsListener } from '~/components/Analytics'
import { GlobalHeader } from '~/components/GlobalHeader'
import { HeaderContextProvider } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'
import { LanguageProvider } from '~/components/Language'
import { Modal } from '~/components/Modal'
import ProgressBar from '~/components/ProgressBar'
import { ToastHolder } from '~/components/ToastHolder'
import {
  processViewer,
  ViewerContext,
  ViewerUserFragment
} from '~/components/Viewer'

import { RootQuery } from './__generated__/RootQuery'

const ROOT_QUERY = gql`
  query RootQuery {
    viewer {
      id
      ...ViewerUser
      ...GlobalHeaderUser
      ...AnalyticsUser
    }
  }
  ${ViewerUserFragment.user}
  ${GlobalHeader.fragments.user}
  ${AnalyticsListener.fragments.user}
`

export const Layout: React.FC = ({ children }) => {
  const { loading, data } = useQuery<RootQuery>(ROOT_QUERY)
  const viewer = data && data.viewer

  if (loading || !viewer) {
    return null
  }

  return (
    <ViewerContext.Provider value={processViewer(viewer)}>
      <LanguageProvider>
        <HeaderContextProvider>
          <AnalyticsListener user={viewer || {}} />
          <Head />

          <GlobalHeader user={viewer} />

          {children}

          <Modal.Anchor />
          <ToastHolder />
          <ProgressBar />
        </HeaderContextProvider>
      </LanguageProvider>
    </ViewerContext.Provider>
  )
}
