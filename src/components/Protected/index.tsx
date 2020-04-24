import React, { useContext, useEffect } from 'react'

import { Layout, Spinner, ViewerContext } from '~/components'

import { redirectToLogin } from '~/common/utils'

export const Protected: React.FC = ({ children }) => {
  const viewer = useContext(ViewerContext)

  useEffect(() => {
    if (!viewer.isAuthed && process.browser) {
      redirectToLogin()
    }
  }, [])

  if (viewer.isAuthed) {
    return <>{children}</>
  }

  if (!process.browser) {
    return (
      <Layout.Main>
        <Spinner />
      </Layout.Main>
    )
  }

  return (
    <Layout.Main>
      <Spinner />
    </Layout.Main>
  )
}
