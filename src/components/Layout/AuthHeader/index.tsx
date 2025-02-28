import { useContext } from 'react'

import { Layout, Media, ViewerContext } from '~/components'

type HeaderProps = {
  title: React.ReactNode
}

const AuthedHeader: React.FC<HeaderProps> = ({ title }) => {
  const viewer = useContext(ViewerContext)

  if (!viewer.isAuthed) {
    return (
      <Media lessThan="md">
        <Layout.Header
          left={<Layout.Header.Title>{title}</Layout.Header.Title>}
        />
      </Media>
    )
  }

  return (
    <Media lessThan="md">
      <Layout.Header
        left={<Layout.Header.MeButton />}
        right={<Layout.Header.Title>{title}</Layout.Header.Title>}
      />
    </Media>
  )
}

const AuthHeader: React.FC<HeaderProps> = ({ title }) => {
  return <AuthedHeader title={title} />
}

export default AuthHeader
