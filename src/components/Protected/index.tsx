import React, { useContext, useEffect } from 'react'

import { redirectToHomePage } from '~/common/utils'
import { Layout, Spinner, ViewerContext } from '~/components'

export const Protected: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const viewer = useContext(ViewerContext)

  useEffect(() => {
    if (!viewer.isAuthed) {
      redirectToHomePage()
    }
  }, [])

  if (viewer.isAuthed) {
    return <>{children}</>
  }

  return (
    <Layout.Main>
      <Spinner />
    </Layout.Main>
  )
}
