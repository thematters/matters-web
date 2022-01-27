import dynamic from 'next/dynamic'
import { useContext } from 'react'

import {
  ConnectWalletButton,
  IconLogo,
  Layout,
  Spacer,
  UniversalAuthButton,
  useResponsive,
  ViewerContext,
} from '~/components'

import Feed from './Feed'
import Sidebar from './Sidebar'
import styles from './styles.css'

const DynamicAnnouncements = dynamic(() => import('./Announcements'), {
  ssr: false,
})

const Home = () => {
  const isSmallUp = useResponsive('sm-up')
  const viewer = useContext(ViewerContext)

  const hasLogo = !viewer.isAuthed && !isSmallUp
  const showConnect = viewer.isAuthed && !viewer.info.ethAddress

  return (
    <Layout.Main
      aside={
        <>
          <Sidebar.Tags />
          <Sidebar.Authors />
        </>
      }
    >
      {(!viewer.isAuthed || !isSmallUp) && (
        <Layout.Header
          left={viewer.isAuthed && <Layout.Header.MeButton />}
          right={
            <>
              {hasLogo ? (
                <section className="logo">
                  <IconLogo />
                </section>
              ) : (
                <Layout.Header.Title id="discover" />
              )}

              {(!viewer.isAuthed || showConnect) && (
                <section className="buttons">
                  {showConnect && <ConnectWalletButton />}
                  {!viewer.isAuthed && <UniversalAuthButton />}
                </section>
              )}
            </>
          }
        />
      )}

      <DynamicAnnouncements />

      <Spacer size="xtight" />

      <Feed />

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default Home
