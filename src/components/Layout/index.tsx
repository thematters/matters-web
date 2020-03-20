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

export const Layout: React.FC & {
  Main: typeof Main
  Header: typeof Header
  Spacing: typeof Spacing
} = ({ children }) => {
  const isSmallUp = useResponsive('sm-up')
  const router = useRouter()

  const isInDraftDetail = router.pathname === PATHS.ME_DRAFT_DETAIL.href
  const showNav = isSmallUp
  const showNavBar = !isSmallUp && !isInDraftDetail

  return (
    <>
      <Head />

      <div className="l-row full">
        {showNav && (
          <nav role="navigation" className="u-sm-down-hide">
            <SideNav />
          </nav>
        )}

        <main>{children}</main>
      </div>

      {showNavBar && (
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
  // TODO: this prop only temporally used by DraftDetail,
  // would be removed after revamped
  asideShowInMobile?: boolean
}

const Main: React.FC<MainProps> = ({
  aside,
  bgColor,
  asideShowInMobile,
  children
}) => {
  const isLargeUp = useResponsive('lg-up')
  const router = useRouter()

  const articleClass = classNames({
    [`bg-${bgColor}`]: !!bgColor,
    asideShowInMobile
  })
  const asideClass = classNames({
    'u-lg-down-hide': !asideShowInMobile
  })

  const isInSearch = router.pathname === PATHS.SEARCH.href
  const showAside = isLargeUp || asideShowInMobile
  const showSearchBar = isLargeUp && !isInSearch

  return (
    <div className="l-row full">
      <article className={articleClass}>{children}</article>

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

      <style jsx>{styles}</style>
    </div>
  )
}

Layout.Main = Main
Layout.Header = Header
Layout.Spacing = Spacing
