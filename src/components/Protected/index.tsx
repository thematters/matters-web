import React, { useContext, useEffect } from 'react'

import { Spinner } from '~/components/Spinner'
import { ViewerContext } from '~/components/Viewer'

import { redirectToLogin } from '~/common/utils'

export const Protected: React.FC = ({ children }) => {
  const viewer = useContext(ViewerContext)

  if (viewer.isAuthed) {
    return <>{children}</>
  }

  if (!process.browser) {
    return <Spinner />
  }

  useEffect(() => {
    redirectToLogin()
  }, [])

  return <Spinner />
}
