import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { Head, OnboardingTasks, SearchBar, ViewerContext } from '~/components'

import { PATHS } from '~/common/enums'

import Header from './Header'
import NavBar from './NavBar'
import SideFooter from './SideFooter'
import SideNav from './SideNav'
import Spacing from './Spacing'
import styles from './styles.css'

export const Layout: React.FC & {
  Main: typeof Main
  Header: typeof Header
  Spacing: typeof Spacing
} = ({ children }) => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const isInDraftDetail = router.pathname === PATHS.ME_DRAFT_DETAIL
  const isInArticleDetail = router.pathname === PATHS.ARTICLE_DETAIL
  const showOnboardingTasks =
    !isInDraftDetail && !isInArticleDetail && viewer.onboardingTasks.enabled

  return (
    <>
      <Head />

      <main className="l-row full">
        <nav role="navigation" className="l-col-three-left u-sm-down-hide">
          <SideNav />
        </nav>

        {children}
      </main>

      {showOnboardingTasks && (
        <section className="u-lg-up-hide">
          <OnboardingTasks.NavBar />
        </section>
      )}

      {!isInDraftDetail && (
        <footer className="u-sm-up-hide">
          <NavBar />
        </footer>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

interface MainProps {
  aside?: React.ReactNode
  bgColor?: 'grey-lighter'
  inEditor?: boolean
}

const Main: React.FC<MainProps> = ({ aside, bgColor, inEditor, children }) => {
  const viewer = useContext(ViewerContext)

  const router = useRouter()
  const isInSearch = router.pathname === PATHS.SEARCH
  const isInArticleDetail = router.pathname === PATHS.ARTICLE_DETAIL
  const showOnboardingTasks =
    !inEditor && !isInArticleDetail && viewer.onboardingTasks.enabled

  const articleClasses = classNames({
    'l-col-three-mid': true,
    [`bg-${bgColor}`]: !!bgColor,
    hasNavBar: !isInArticleDetail && !inEditor,
    hasOnboardingTasks: showOnboardingTasks,
  })
  const asideClasses = classNames({
    'l-col-three-right': true,
    'u-lg-down-hide': true,
    'in-editor': inEditor,
  })

  return (
    <>
      <article className={articleClasses}>{children}</article>

      <aside className={asideClasses}>
        {!isInSearch && !inEditor && (
          <section className="u-lg-down-hide">
            <SearchBar />
          </section>
        )}

        {showOnboardingTasks && (
          <section className="u-lg-down-hide">
            <OnboardingTasks.Widget />
          </section>
        )}

        {aside}

        {!inEditor && (
          <section className="u-lg-down-hide">
            <SideFooter />
          </section>
        )}
      </aside>

      <style jsx>{styles}</style>
    </>
  )
}

Layout.Main = Main
Layout.Header = Header
Layout.Spacing = Spacing
