import { WatchQueryFetchPolicy } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

const FetchPolicyContext = createContext<{
  fetchPolicy: WatchQueryFetchPolicy
  setFetchPolicy: (fetchPolicy: WatchQueryFetchPolicy) => void
}>({
  fetchPolicy: 'cache-first',
  setFetchPolicy: () => {},
})

export function FetchPolicyProvider({ children }: { children: ReactNode }) {
  const [fetchPolicy, setFetchPolicy] =
    useState<WatchQueryFetchPolicy>('cache-first')

  return (
    <FetchPolicyContext.Provider value={{ fetchPolicy, setFetchPolicy }}>
      {children}
    </FetchPolicyContext.Provider>
  )
}

export function useFetchPolicy() {
  const context = useContext(FetchPolicyContext)
  const { asPath } = useRouter()

  // Pin the policy to the current route. Otherwise the policy switch on
  // `routeChangeStart` makes the leaving page refetch (placeholder + scroll
  // to top) before the next page renders.
  const pinnedRef = useRef({ asPath, fetchPolicy: context.fetchPolicy })
  if (pinnedRef.current.asPath !== asPath) {
    pinnedRef.current = { asPath, fetchPolicy: context.fetchPolicy }
  }

  return {
    fetchPolicy: pinnedRef.current.fetchPolicy,
    setFetchPolicy: context.setFetchPolicy,
  }
}

export const FetchPolicyOnRouteChange = () => {
  const router = useRouter()
  const { setFetchPolicy } = useFetchPolicy()
  const isPopStateRef = useRef(false)

  useEffect(() => {
    // Refresh when clicking links (but not for back/forward)
    const handleRouteChange = () => {
      if (!isPopStateRef.current) {
        // Render cached data first to avoid flashing placeholders
        setFetchPolicy('cache-and-network')
      }

      // Reset the flag after handling
      isPopStateRef.current = false
    }

    // Use cache for forward/back navigation
    router.beforePopState(() => {
      isPopStateRef.current = true
      setFetchPolicy('cache-first')
      return true
    })

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router, setFetchPolicy])

  return null
}
