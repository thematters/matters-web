import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AnalyticsListener } from '~/components/Analytics'
import { Error } from '~/components/Error'
import { GlobalHeader } from '~/components/GlobalHeader'
import { HeaderContextProvider } from '~/components/GlobalHeader/Context'
import { QueryError } from '~/components/GQL'
import { Head } from '~/components/Head'
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
  const { loading, data, error } = useQuery<RootQuery>(ROOT_QUERY)
  const viewer = data?.viewer

  if (loading) {
    return null
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!viewer) {
    return <Error />
  }

  return (
    <ViewerContext.Provider value={processViewer(viewer)}>
      <HeaderContextProvider>
        <AnalyticsListener user={viewer || {}} />
        <Head />

        <GlobalHeader user={viewer} />

        {children}

        <Modal.Anchor />
        <ToastHolder />
        <ProgressBar />
      </HeaderContextProvider>
    </ViewerContext.Provider>
  )
}
