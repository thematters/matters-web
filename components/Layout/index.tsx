import gql from 'graphql-tag'

import { AnalyticsListener } from '~/components/Analytics'
import { GlobalHeader } from '~/components/GlobalHeader'
import { Head } from '~/components/Head'
import { Modal } from '~/components/Modal'
import { ToastHolder } from '~/components/ToastHolder'
import { ViewerContext, ViewerUserFragment } from '~/components/Viewer'

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
    <ViewerContext.Provider value={user || {}}>
      <Head />
      <GlobalHeader user={user} />
      <ToastHolder />
      <Modal.Anchor />

      {children}
    </ViewerContext.Provider>
  )

Layout.fragments = fragments
