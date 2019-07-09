import React, { ReactNode, useState } from 'react'

/**
 * Inital context for system wise preferences.
 *
 */
export const SystemContext = React.createContext({} as {
  feedSortBy: 'hottest' | 'newest',
  setFeedSortBy: (type: 'hottest' | 'newest') => void
})

/**
 * Context provider for system wise preferences.
 *
 * Usage:
 *
 * ```jsx
 *   <SystemProvider defaultFeedSortBy={optional}>
 *     <App />
 *   </SystemProvider>
 * ```
 *
 */
export const SystemProvider = ({
  children,
  defaultFeedSortBy = 'hottest'
}: {
  children: ReactNode
  defaultFeedSortBy?: string
}) => {
  const [feedSortBy, setFeedSortBy] = useState<'hottest' | 'newest'>('hottest')
  return (
    <SystemContext.Provider
      value={{
        feedSortBy,
        setFeedSortBy
      }}
    >
      {children}
    </SystemContext.Provider>
  )
}

export const SystemConsumer = SystemContext.Consumer
