import classNames from 'classnames'
import { useRouter } from 'next/router'

import { Head, SearchBar } from '~/components'

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
  const router = useRouter()
  const isInDraftDetail = router.pathname === PATHS.ME_DRAFT_DETAIL

  return (
    <>
      <Head />

      <main className="l-row full">
        <nav role="navigation" className="l-col-three-left u-sm-down-hide">
          <SideNav />
        </nav>

        {children}
      </main>

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
  const router = useRouter()
  const isInSearch = router.pathname === PATHS.SEARCH

  const articleClasses = classNames({
    'l-col-three-mid': true,
    [`bg-${bgColor}`]: !!bgColor,
  })
  const asideClasses = classNames({
    'l-col-three-right': true,
    'u-lg-down-hide': inEditor,
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
