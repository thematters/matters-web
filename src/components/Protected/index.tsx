import React, { useContext } from 'react'

import { ViewerContext } from '~/components/Viewer'

import { redirectToLogin } from '~/common/utils'

export const Protected: React.FC = ({ children }) => {
  const viewer = useContext(ViewerContext)

  if (viewer.isAuthed) {
    return <>{children}</>
  }

  if (!process.browser) {
    return null
  }

  redirectToLogin()
  return null
}
