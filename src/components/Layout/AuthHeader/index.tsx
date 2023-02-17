import { useContext } from 'react'

import { TextId } from '~/common/enums'
import {
  ConnectWalletButton,
  IconLogo,
  Layout,
  Media,
  UniversalAuthButton,
  ViewerContext,
} from '~/components'

import styles from './styles.css'

type HeaderProps = {
  title: TextId
}

const AnnonmousHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Layout.Header
      right={
        <>
          <div>
            <Media at="sm">
              <section className="logo">
                <IconLogo />
              </section>
            </Media>
            <Media greaterThan="sm">
              <Layout.Header.Title id={title} />
            </Media>
          </div>

          <UniversalAuthButton />

          <style jsx>{styles}</style>
        </>
      }
    />
  )
}

const AuthedHeader: React.FC<HeaderProps> = ({ title }) => {
  const viewer = useContext(ViewerContext)
  const showConnect = viewer.isAuthed && !viewer.info.ethAddress

  return (
    <Media at="sm">
      <Layout.Header
        left={<Layout.Header.MeButton />}
        right={
          <>
            <Layout.Header.Title id={title} />
            {showConnect && <ConnectWalletButton />}
          </>
        }
      />
    </Media>
  )
}

const AuthHeader: React.FC<HeaderProps> = ({ title }) => {
  const viewer = useContext(ViewerContext)

  if (viewer.isAuthed) {
    return <AuthedHeader title={title} />
  }

  return <AnnonmousHeader title={title} />
}

export default AuthHeader
