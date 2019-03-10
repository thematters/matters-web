import _get from 'lodash/get'
import { createContext, useState } from 'react'

export interface DefaultHeader {
  type: 'default'
}

export interface AuthHeader {
  type: 'login' | 'signUp' | 'forgot'
}

export interface DraftHeader {
  type: 'draft'
  state: 'saving' | 'saved' | 'saveFailed' | ''
}

type HeaderState = DefaultHeader | AuthHeader | DraftHeader

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
  const [headerState, setHeaderState] = useState<HeaderState>({
    type: 'default'
  })

  return (
    <HeaderContext.Provider
      value={{
        headerState,
        updateHeaderState: state =>
          setHeaderState({
            ...headerState,
            ...state
          })
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
