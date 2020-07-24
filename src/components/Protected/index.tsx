import React, { useContext, useEffect } from 'react'

import { Layout, Spinner, ViewerContext } from '~/components'

import { redirectToLogin } from '~/common/utils'

export const Protected: React.FC = ({ children }) => {
  const viewer = useContext(ViewerContext)

  useEffect(() => {
    if (viewer.privateFetched && !viewer.isAuthed) {
      redirectToLogin()
    }
  }, [viewer.privateFetched])


  if (viewer.isAuthed && viewer.privateFetched) {
    return <>{children}</>
  }

  return (
    <Layout.Main>
      <Spinner />
    </Layout.Main>
  )
}
