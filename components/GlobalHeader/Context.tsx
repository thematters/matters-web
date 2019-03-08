import _get from 'lodash/get'
import { createContext, useContext, useState } from 'react'

import { ViewerContext } from '~/components/Viewer'

export interface DefaultHeader {
  type: 'default'
}

export interface AuthHeader {
  type: 'login' | 'signUp' | 'forgot'
}

export interface DraftHeader {
  type: 'draft'
  draftId: string
  state: 'saving' | 'saved' | 'saveFailed' | ''
}

type HeaderStateInput = DefaultHeader | AuthHeader | DraftHeader

type HeaderState = HeaderStateInput & {
  isAuthed: boolean
}

export const HeaderContext = createContext({} as {
  headerState: HeaderState
  updateHeaderState: (state: DefaultHeader | AuthHeader | DraftHeader) => void
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
        updateHeaderState: state => setHeaderState({ ...state, isAuthed })
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
