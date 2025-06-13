import { FetchPolicy } from '@apollo/client'
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
  fetchPolicy: FetchPolicy
  setFetchPolicy: (fetchPolicy: FetchPolicy) => void
}>({
  fetchPolicy: 'cache-first',
  setFetchPolicy: () => {},
})

export function FetchPolicyProvider({ children }: { children: ReactNode }) {
  const [fetchPolicy, setFetchPolicy] = useState<FetchPolicy>('cache-first')

  return (
    <FetchPolicyContext.Provider value={{ fetchPolicy, setFetchPolicy }}>
      {children}
    </FetchPolicyContext.Provider>
  )
}

export function useFetchPolicy() {
  return useContext(FetchPolicyContext)
}

export const FetchPolicyOnRouteChange = () => {
  const router = useRouter()
  const { setFetchPolicy } = useFetchPolicy()
  const isPopStateRef = useRef(false)

  useEffect(() => {
    // Force refresh when clicking links (but not for back/forward)
    const handleRouteChange = () => {
      if (!isPopStateRef.current) {
        // This is a regular navigation (link click), use network-only
        setFetchPolicy('network-only')
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
