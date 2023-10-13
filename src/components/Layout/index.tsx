import classNames from 'classnames'
import Sticky from 'react-stickynode'

import { Head, Media, SearchBar, useRoute } from '~/components'

import AuthHeader from './AuthHeader'
import FixedMain from './FixedMain'
import Header from './Header'
import NavBar from './NavBar'
import Notice from './Notice'
import SideFooter from './SideFooter'
import SideNav from './SideNav'
import Spacing from './Spacing'
import styles from './styles.module.css'

export const Layout: React.FC<{ children?: React.ReactNode }> & {
  Main: typeof Main
  Header: typeof Header
  FixedMain: typeof FixedMain
  AuthHeader: typeof AuthHeader
  Notice: typeof Notice
} = ({ children }) => {
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')

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

      {!isInDraftDetail && !isInArticleDetail && (
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
  inEditor?: boolean
}

const Main: React.FC<React.PropsWithChildren<MainProps>> & {
  Spacing: typeof Spacing
} = ({ aside, inEditor, children }) => {
  const { isInPath } = useRoute()
  const isInSettings = isInPath('SETTINGS')
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  const articleClasses = classNames({
    [styles.article]: true,
    [styles.hasNavBar]: !isInArticleDetail && !isInDraftDetail,
  })

  return (
    <>
      <article id="ptr" className={articleClasses}>
        {children}
      </article>

      <aside className={styles.aside}>
        <Media greaterThanOrEqual="lg">
          <Sticky enabled top={0}>
            <section className={styles.content}>
              <section className={styles.top}>
                {!inEditor && <SearchBar />}

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
