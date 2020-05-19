import { usePullToRefresh } from '~/components'

interface PullToRefreshProps {
  timeout?: number
  refresh?: () => any
}

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
