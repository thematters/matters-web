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

export const Layout: React.FC<{
  header?: React.ReactNode
  children?: React.ReactNode
}> & {
  Main: typeof Main
  Header: typeof Header
  FixedMain: typeof FixedMain
  AuthHeader: typeof AuthHeader
  Notice: typeof Notice
} = ({ header, children }) => {
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  const isInArticleDetailHistory = isInPath('ARTICLE_DETAIL_HISTORY')
  const isInMomentDetail = isInPath('MOMENT_DETAIL')
  const isInMomentDetailEdit = isInPath('MOMENT_DETAIL_EDIT')

  const isInOneColumnLayout = isInDraftDetail

  const layoutClasses = classNames({
    [styles.container]: !isInOneColumnLayout,
    [styles.oneColumnLayout]: isInOneColumnLayout,
  })

  return (
    <>
      <Head description={null} />

      {header}

      <div className={layoutClasses}>
        <main className={styles.main}>
          {!isInArticleDetailHistory && !isInDraftDetail && (
            <nav role="navigation" className={styles.sidenav}>
              <section className={styles.sideNavContent}>
                <Media greaterThan="sm">
                  <SideNav />
                </Media>
              </section>
            </nav>
          )}

          {children}
        </main>
      </div>

      {!isInDraftDetail &&
        !isInArticleDetail &&
        !isInArticleDetailHistory &&
        !isInMomentDetail &&
        !isInMomentDetailEdit && (
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
  showAside?: boolean
}

const Main: React.FC<React.PropsWithChildren<MainProps>> & {
  Spacing: typeof Spacing
} = ({ aside, showAside = true, children }) => {
  const { isInPath } = useRoute()
  const isInEditor =
    isInPath('ARTICLE_DETAIL_EDIT') || isInPath('ME_DRAFT_DETAIL')
  const isInSettings = isInPath('SETTINGS')
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInArticleDetailHistory = isInPath('ARTICLE_DETAIL_HISTORY')

  const articleClasses = classNames({
    [styles.article]: true,
    [styles.hasNavBar]: !isInArticleDetail && !isInDraftDetail,
  })

  const enbableSticky = !isInArticleDetailHistory

  return (
    <>
      <article className={articleClasses}>{children}</article>

      {showAside && (
        <aside className={styles.aside}>
          <Media greaterThanOrEqual="lg">
            <Sticky enabled={enbableSticky} top={0} enableTransforms={false}>
              <section className={styles.content}>
                <section className={styles.top}>
                  {!isInEditor && !isInArticleDetailHistory && <SearchBar />}

                  {aside}
                </section>

                {!isInEditor && !isInSettings && !isInArticleDetailHistory && (
                  <SideFooter />
                )}
              </section>
            </Sticky>
          </Media>
        </aside>
      )}
    </>
  )
}

Main.Spacing = Spacing

Layout.Main = Main
Layout.Header = Header
Layout.FixedMain = FixedMain
Layout.AuthHeader = AuthHeader
Layout.Notice = Notice
