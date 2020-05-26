import { usePullToRefresh } from '~/components'

interface PullToRefreshProps {
  timeout?: number
  refresh?: () => any
}

/**
 * Pull to Refresh wrapper with built-in register & handler
 *
 * Usage:
 *
 *
 * ```tsx
 * // use built-in handler
 * <PullToRefresh refresh={refetch}>...</PullToRefresh>
 *
 *
 * // use custom handler
 * const ComponentA = () => {
 *   usePullToRefresh.Handler(refetch)
 *
 *   return <PullToRefresh>...</PullToRefresh>
 * }
 * ```
 *
 */
export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  timeout,
  refresh,
  children,
}) => {
  usePullToRefresh.Register('[data-ptr]', timeout)
  usePullToRefresh.Handler(() => {
    if (refresh) {
      refresh()
    }
  })

  return <div data-ptr>{children}</div>
}
