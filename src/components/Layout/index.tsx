import classNames from 'classnames'
import { useRouter } from 'next/router'

import { Head, SearchBar, useResponsive } from '~/components'

import { PATHS } from '~/common/enums'

import Header from './Header'
import NavBar from './NavBar'
import SideFooter from './SideFooter'
import SideNav from './SideNav'
import Spacing from './Spacing'
import styles from './styles.css'

interface LayoutProps {
  aside?: React.ReactNode
  asideShowInMobile?: boolean
  bgColor?: 'grey-lighter'
}

export const Layout: React.FC<LayoutProps> & {
  Header: typeof Header
  Spacing: typeof Spacing
} = ({ aside, asideShowInMobile, bgColor, children }) => {
  const isSmallUp = useResponsive('sm-up')
  const isLargeUp = useResponsive('lg-up')
  const router = useRouter()
  const mainClass = classNames({
    'l-col-4 l-col-sm-8 l-col-md-9 l-col-lg-9': true,
    [`bg-${bgColor}`]: !!bgColor
  })
  const navClass = classNames({
    'l-col-4 l-col-sm-1 l-col-md-2 l-col-lg-3': true,
    'u-sm-down-hide': true
  })
  const articleClass = classNames({
    'l-col-4 l-col-sm-7 l-col-md-7 l-col-lg-9': true
  })
  const asideClass = classNames({
    'l-col-4 l-col-sm-7 l-offset-sm-1 l-col-md-7 l-offset-md-2 l-col-lg-3 l-offset-lg-0': true,
    'u-lg-down-hide': !asideShowInMobile
  })
  const isInSearch = router.pathname === PATHS.SEARCH.href
  const showNav = isSmallUp
  const showAside = isLargeUp || asideShowInMobile
  const showSearchBar = isLargeUp && !isInSearch

  return (
    <>
      <Head />

      <div className="l-row full">
        <main className={mainClass}>
          <div className="l-row full">
            {showNav && (
              <nav role="navigation" className={navClass}>
                <SideNav />
              </nav>
            )}

            <article className={articleClass}>{children}</article>
          </div>
        </main>

        {showAside && (
          <aside className={asideClass}>
            {showSearchBar && (
              <section className="u-lg-down-hide">
                <SearchBar />
              </section>
            )}

            {aside}

            <SideFooter />
          </aside>
        )}
      </div>

      <footer className="u-sm-up-hide">
        <NavBar />
      </footer>

      <style jsx>{styles}</style>
    </>
  )
}

Layout.Header = Header
Layout.Spacing = Spacing
