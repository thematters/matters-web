import React, { useContext, useEffect, useState } from 'react'

import { redirectToLogin } from '~/common/utils'
import { Layout, SpinnerBlock, ViewerContext } from '~/components'

export const Protected: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const viewer = useContext(ViewerContext)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && !viewer.isAuthed) {
      redirectToLogin()
    }
  }, [hasMounted, viewer.isAuthed])

  // Prevent hydration mismatch by ensuring consistent rendering
  // between server and client during initial load
  if (!hasMounted) {
    return (
      <Layout.Main>
        <SpinnerBlock />
      </Layout.Main>
    )
  }

  if (viewer.isAuthed) {
    return <>{children}</>
  }

  return (
    <Layout.Main>
      <SpinnerBlock />
    </Layout.Main>
  )
}
