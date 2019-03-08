import _get from 'lodash/get'
import { createContext, useContext, useState } from 'react'

import { ViewerContext } from '~/components/Viewer'

export interface DefaultHeader {
  type: 'default'
}

export interface LoginHeader {
  type: 'login'
}

export interface DraftHeader {
  type: 'draft'
  state: 'saving' | 'saved' | 'save-failed' | ''
}

type HeaderStateInput = DefaultHeader | LoginHeader | DraftHeader

type HeaderState = HeaderStateInput & {
  isAuthed: boolean
}

export const HeaderContext = createContext({} as {
  headerState: HeaderState
  updateHeaderState: (state: DefaultHeader | LoginHeader | DraftHeader) => void
})

export const HeaderContextConsumer = HeaderContext.Consumer

export const HeaderContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const viewer = useContext(ViewerContext)

  const isAuthed = !!viewer.id

  const [headerState, setHeaderState] = useState<HeaderState>({
    type: 'default',
    isAuthed
  })

  return (
    <HeaderContext.Provider
      value={{
        headerState,
        updateHeaderState: state =>
          setHeaderState({ ...headerState, ...state, isAuthed })
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
