import { Head, SearchBar, useResponsive } from '~/components'

import NavBar from './NavBar'
import SideFooter from './SideFooter'
import SideNav from './SideNav'
import Spacing from './Spacing'
import styles from './styles.css'

interface LayoutProps {
  rightSide?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> & { Spacing: typeof Spacing } = ({
  rightSide,
  children
}) => {
  const isLargeUp = useResponsive('lg-up')

  return (
    <>
      <Head />

      <main className="l-row full">
        <nav
          role="navigation"
          className="l-col-4 l-col-sm-1 l-col-md-2 l-col-lg-2 u-sm-down-hide"
        >
          <SideNav />
        </nav>

        <article className="l-col-4 l-col-sm-7 l-col-md-7 l-col-lg-7">
          {children}
        </article>

        {isLargeUp && (
          <aside className="l-col-4 l-col-sm-7 l-col-md-7 l-col-lg-3 u-lg-down-hide">
            <section>
              <SearchBar />
            </section>

            {rightSide}

            <SideFooter />
          </aside>
        )}
      </main>

      <footer className="u-sm-up-hide">
        <NavBar />
      </footer>

      <style jsx>{styles}</style>
    </>
  )
}

Layout.Spacing = Spacing
