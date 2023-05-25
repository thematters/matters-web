import { useContext } from 'react'

import { TextId } from '~/common/enums'
import { ConnectWalletButton, Layout, Media, ViewerContext } from '~/components'

type HeaderProps = {
  title: TextId
}

const AuthedHeader: React.FC<HeaderProps> = ({ title }) => {
  const viewer = useContext(ViewerContext)
  const showConnect = viewer.isAuthed && !viewer.info.ethAddress

  if (!viewer.isAuthed) {
    return (
      <Media at="sm">
        <Layout.Header left={<Layout.Header.Title id={title} />} />
      </Media>
    )
  }

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
  return <AuthedHeader title={title} />
}

export default AuthHeader
