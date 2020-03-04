import { createContext, useState } from 'react'

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

export interface AboutHeader {
  type: 'about'
  bgColor: 'transparent' | 'default'
}

export interface MigrationHeader {
  type: 'migration'
  bgColor: 'transparent' | 'default'
}

type HeaderState = DefaultHeader | AuthHeader | DraftHeader | AboutHeader | MigrationHeader

export const HeaderContext = createContext(
  {} as {
    headerState: HeaderState
    updateHeaderState: (
      state: DefaultHeader | AuthHeader | DraftHeader | AboutHeader | MigrationHeader
    ) => void
  }
)

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
