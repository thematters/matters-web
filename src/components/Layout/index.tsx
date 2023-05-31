import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import Sticky from 'react-stickynode'

import {
  Head,
  Media,
  PullToRefresh,
  SearchBar,
  usePullToRefresh,
  useRoute,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { ClientPreferenceQuery } from '~/gql/graphql'

import AuthHeader from './AuthHeader'
import FixedMain from './FixedMain'
import Header from './Header'
import NavBar from './NavBar'
import SideFooter from './SideFooter'
import SideNav from './SideNav'
import Spacing from './Spacing'
import styles from './styles.css'

const DynamicOnboardingTasksNavBar = dynamic(
  () =>
    import('~/components/OnboardingTasks').then(
      (mod) => mod.OnboardingTasks.NavBar
    ),
  {
    ssr: true, // enable for first screen
  }
)
const DynamicOnboardingTasksWidget = dynamic(
  () =>
    import('~/components/OnboardingTasks').then(
      (mod) => mod.OnboardingTasks.Widget
    ),
  {
    ssr: true, // enable for first screen
  }
)

export const Layout: React.FC<{ children?: React.ReactNode }> & {
  Main: typeof Main
  Header: typeof Header
  Spacing: typeof Spacing
  FixedMain: typeof FixedMain
  AuthHeader: typeof AuthHeader
} = ({ children }) => {
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  return (
    <>
      <Head />

      <div className="l-container full">
        <main className="l-row">
          <nav role="navigation" className="l-col-three-left">
            <section className="sidenav">
              <Media greaterThan="sm">
                <SideNav />
              </Media>
            </section>
          </nav>

          {children}
        </main>
      </div>

      {!isInDraftDetail && (
        <Media at="sm">
          <footer>
            <NavBar />
          </footer>
        </Media>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

interface MainProps {
  aside?: React.ReactNode
  smBgColor?: 'grey-lighter'
  inEditor?: boolean
}

const Main: React.FC<React.PropsWithChildren<MainProps>> = ({
  aside,
  smBgColor,
  inEditor,
  children,
}) => {
  const { isInPath, isPathStartWith } = useRoute()
  const isInSettings = isInPath('SETTINGS')
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  const isInCircle = isPathStartWith('/~', true)
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  const { data } = useQuery<ClientPreferenceQuery>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const onboardingTasks = data?.clientPreference.onboardingTasks
  const showOnboardingTasks =
    !inEditor && !isInArticleDetail && !isInCircle && onboardingTasks?.enabled

  const articleClasses = classNames({
    'l-col-three-mid': true,
    [`bg-${smBgColor}`]: !!smBgColor,
    hasNavBar: !isInArticleDetail && !isInDraftDetail,
    hasOnboardingTasks: showOnboardingTasks,
  })

  usePullToRefresh.Register('#ptr')
  usePullToRefresh.Handler(() => window.location.reload())

  return (
    <>
      <article id="ptr" className={articleClasses}>
        <PullToRefresh>
          {children}

          {showOnboardingTasks && (
            <Media lessThan="xl">
              <DynamicOnboardingTasksNavBar />
            </Media>
          )}
        </PullToRefresh>
      </article>

      <aside className="l-col-three-right">
        <Media greaterThanOrEqual="xl">
          <Sticky enabled={true} top={32}>
            <section className="content">
              {!inEditor && <SearchBar />}

              {showOnboardingTasks && <DynamicOnboardingTasksWidget />}

              {aside}

              {!inEditor && !isInSettings && <SideFooter />}
            </section>
          </Sticky>
        </Media>
      </aside>

      <style jsx>{styles}</style>
    </>
  )
}

Layout.Main = Main
Layout.Header = Header
Layout.Spacing = Spacing
Layout.FixedMain = FixedMain
Layout.AuthHeader = AuthHeader
