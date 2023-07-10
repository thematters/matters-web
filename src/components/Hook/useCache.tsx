import {
  Context,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

type CacheType<T> = [cache: T | null, setCache: Dispatch<SetStateAction<T>>]

/**
 * This hook helps to resolve the issue(#2266) about fetch-policy set to `no-cache`.
 *
 * Usage:
 *
 * ```tsx
 * export const cacheContext = createCacheContext();
 *
 * function Component() {
 *  const [cache, setCache, CacheProvider] = useCache<CACHE_TYPE>(initialCache, cacheContext)
 *
 *  const { data } = useQuery(gql_schema, {
 *    fetchPolicy: 'no-cache',
 *    onCompleted: () => setCache(data.xxx)
 *  })
 *
 *  return (
 *    <CacheProvider>
 *      ...
 *      <ChildComponent />
 *    </CacheProvider>
 *  )
 * }
 *
 * function ChildComponent() {
 *  const [cache, setCache] = useContext(cacheContext)
 *
 *  ...
 * }
 *
 * ```
 */

export const createCacheContext = <T extends {}>() =>
  createContext<CacheType<T>>([null, () => undefined])

export function useCache<T>(
  initialCache: T,
  CacheContext: Context<CacheType<T>>
): [
  T,
  Dispatch<SetStateAction<T>>,
  ({ children }: { children: ReactNode }) => JSX.Element,
] {
  const [cache, setCache] = useState<T>(initialCache)

  const CacheProvider = ({ children }: { children: ReactNode }) => (
    <CacheContext.Provider value={[cache, setCache]}>
      {children}
    </CacheContext.Provider>
  )

  return [cache, setCache, CacheProvider]
}
