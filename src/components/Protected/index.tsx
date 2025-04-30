import React, { useContext, useEffect } from 'react'

import { redirectToLogin } from '~/common/utils'
import { Layout, SpinnerBlock, ViewerContext } from '~/components'

export const Protected: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const viewer = useContext(ViewerContext)

  useEffect(() => {
    if (!viewer.isAuthed) {
      redirectToLogin()
    }
  }, [])

  if (viewer.isAuthed) {
    return <>{children}</>
  }

  return (
    <Layout.Main>
      <SpinnerBlock />
    </Layout.Main>
  )
}
