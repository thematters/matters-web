import gql from 'graphql-tag'

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

import { GatewayContextProvider } from '../Contexts/Gateway'
import { LayoutUser } from './__generated__/LayoutUser'

interface LayoutProps {
  loading: boolean
  user: LayoutUser
  error?: Error
}

const fragments = {
  user: gql`
    fragment LayoutUser on User {
      ...ViewerUser
      ...GlobalHeaderUser
      ...AnalyticsUser
    }
    ${ViewerUserFragment.user}
    ${GlobalHeader.fragments.user}
    ${AnalyticsListener.fragments.user}
  `
}

export const Layout: React.FC<LayoutProps> & {
  fragments: typeof fragments
} = ({ children, loading, user, error }) =>
  loading ? null : (
    <ViewerContext.Provider value={processViewer(user || {})}>
      <LanguageProvider>
        <HeaderContextProvider>
          <GatewayContextProvider>
            <AnalyticsListener user={user} />
            <Head />

            <GlobalHeader user={user} />

            {children}

            <Modal.Anchor />
            <ToastHolder />
            <ProgressBar />
          </GatewayContextProvider>
        </HeaderContextProvider>
      </LanguageProvider>
    </ViewerContext.Provider>
  )

Layout.fragments = fragments
