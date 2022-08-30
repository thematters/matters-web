import { useContext } from 'react'

import {
  ConnectWalletButton,
  Head,
  IconLogo,
  Layout,
  PullToRefresh,
  UniversalAuthButton,
  useResponsive,
  ViewerContext,
} from '@/src/components'

import Build from './Build'
import DisplayPreferences from './DisplayPreferences'
import Learn from './Learn'
import styles from './styles.css'

const Settings = () => {
  const isSmallUp = useResponsive('sm-up')
  const viewer = useContext(ViewerContext)

  const year = new Date().getFullYear()

  const showConnect = viewer.isAuthed && !viewer.info.ethAddress

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'settings' }} />

      <Layout.Header
        right={
          <>
            {isSmallUp ? (
              <section className="title">Settings</section>
            ) : (
              <section className="logo">
                <IconLogo />
              </section>
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

      <PullToRefresh>
        <DisplayPreferences />
        <Learn />
        <Build />

        <section className="copyright">
          <span>
            {'@ '}
            <span itemProp="copyrightYear">{year}</span>{' '}
            <span itemProp="copyrightHolder">Matters</span>
          </span>
        </section>
      </PullToRefresh>
      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default Settings
