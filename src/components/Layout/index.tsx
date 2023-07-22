import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import Sticky from 'react-stickynode'

import { capitalizeFirstLetter } from '~/common/utils'
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
import Notice from './Notice'
import SideFooter from './SideFooter'
import SideNav from './SideNav'
import Spacing from './Spacing'
import styles from './styles.module.css'

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
  FixedMain: typeof FixedMain
  AuthHeader: typeof AuthHeader
  Notice: typeof Notice
} = ({ children }) => {
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  return (
    <>
      <Head />

      <div className={styles.container}>
        <main className={styles.main}>
          <nav role="navigation" className={styles.sidenav}>
            <section className={styles.sideNavContent}>
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
    </>
  )
}

interface MainProps {
  aside?: React.ReactNode
  smBgColor?: 'greyLighter'
  inEditor?: boolean
}

const Main: React.FC<React.PropsWithChildren<MainProps>> & {
  Spacing: typeof Spacing
} = ({ aside, smBgColor, inEditor, children }) => {
  const { isInPath } = useRoute()
  const isInHome = isInPath('HOME')
  const isInSettings = isInPath('SETTINGS')
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  const { data } = useQuery<ClientPreferenceQuery>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const onboardingTasks = data?.clientPreference.onboardingTasks
  const showOnboardingTasks = isInHome && onboardingTasks?.enabled

  const articleClasses = classNames({
    [styles.article]: true,
    [smBgColor ? styles[`bg${capitalizeFirstLetter(smBgColor)}`] : '']:
      !!smBgColor,
    [styles.hasNavBar]: !isInArticleDetail && !isInDraftDetail,
    [styles.hasOnboardingTasks]: showOnboardingTasks,
  })

  usePullToRefresh.Register('#ptr')
  usePullToRefresh.Handler(() => window.location.reload())

  return (
    <>
      <article id="ptr" className={articleClasses}>
        <PullToRefresh>
          {children}

          {showOnboardingTasks && (
            <Media lessThan="lg">
              <DynamicOnboardingTasksNavBar />
            </Media>
          )}
        </PullToRefresh>
      </article>

      <aside className={styles.aside}>
        <Media greaterThanOrEqual="lg">
          <Sticky enabled top={0}>
            <section className={styles.content}>
              <section className={styles.top}>
                {!inEditor && <SearchBar />}

                {showOnboardingTasks && <DynamicOnboardingTasksWidget />}

                {aside}
              </section>

              {!inEditor && !isInSettings && <SideFooter />}
            </section>
          </Sticky>
        </Media>
      </aside>
    </>
  )
}

Main.Spacing = Spacing

Layout.Main = Main
Layout.Header = Header
Layout.FixedMain = FixedMain
Layout.AuthHeader = AuthHeader
Layout.Notice = Notice
