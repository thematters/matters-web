import _get from 'lodash/get'
import { createContext, useContext, useState } from 'react'

import { ViewerContext } from '~/components/Viewer'

interface DefaultHeader {
  type: 'default'
  isAuthed: boolean
}

interface LoginHeader {
  type: 'login'
}

interface DraftHeader {
  type: 'draft'
  saved: boolean
}

type HeaderState = DefaultHeader | LoginHeader | DraftHeader

export const HeaderContext = createContext({} as {
  headerState: HeaderState
  setHeaderState: (state: HeaderState) => void
})

export const HeaderContextConsumer = HeaderContext.Consumer

export const HeaderContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const viewer = useContext(ViewerContext)

  const [headerState, setHeaderState] = useState<HeaderState>({
    type: 'default',
    isAuthed: !!viewer.id
  })

  return (
    <HeaderContext.Provider
      value={{
        headerState,
        setHeaderState
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
