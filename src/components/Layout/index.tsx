import { Head, useResponsive } from '~/components'

import SideFooter from './SideFooter'
import SideNav from './SideNav'
import styles from './styles.css'

interface LayoutProps {
  rightSide?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ rightSide, children }) => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <main className="l-row">
      <Head />

      {isSmallUp && (
        <nav className="l-col-4 l-col-sm-1 l-col-md-2 l-col-lg-2">
          <SideNav />
        </nav>
      )}

      <article className="l-col-4 l-col-sm-7 l-col-md-7 l-col-lg-7">
        {children}
      </article>

      <aside className="l-col-4 l-col-sm-7 l-col-md-7 l-col-lg-3">
        {rightSide}
        <SideFooter />
      </aside>

      <style jsx>{styles}</style>
    </main>
  )
}
