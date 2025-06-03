import { useEffect, useState } from 'react'

import { SpinnerBlock, useIntersectionObserver } from '~/components'

import EndOfResults from '../EndOfResults'

interface Props {
  hasNextPage: boolean
  hasPreviousPage: boolean
  loadMore: () => Promise<unknown>
  loadPrevious: () => Promise<unknown>
  loader?: React.ReactNode
  eof?: React.ReactNode
  eofSpacingTop?: 'base' | 'xLoose'
  scrollableAncestor?: HTMLElement
  className?: string
}

export const DualScroll: React.FC<React.PropsWithChildren<Props>> = ({
  hasNextPage,
  hasPreviousPage,
  loader = <SpinnerBlock />,
  loadMore,
  loadPrevious,
  eof,
  eofSpacingTop,
  // scrollableAncestor,
  children,
  className,
}) => {
  const [isPrevLoading, setIsPrevLoading] = useState(false)

  // Only use intersection observer for bottom loading
  const bottomObserver = useIntersectionObserver()

  // Handle bottom intersection
  useEffect(() => {
    if (bottomObserver.isIntersecting && hasNextPage) {
      loadMore()
    }
  }, [bottomObserver.isIntersecting])

  // Handle scroll for top loading
  const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget
    if (element.scrollTop === 0 && hasPreviousPage) {
      setIsPrevLoading(true)
      await loadPrevious()
      setIsPrevLoading(false)
    }
  }

  return (
    <div
      onScroll={handleScroll}
      style={{ overflow: 'auto' }}
      className={className}
    >
      {/* Top loader */}
      {hasPreviousPage && isPrevLoading ? loader : null}

      {/* Main content */}
      {children}

      {/* Bottom loader */}
      {hasNextPage && <span ref={bottomObserver.ref} />}
      {hasNextPage && loader}

      {!hasNextPage && eof && (
        <EndOfResults message={eof} spacingTop={eofSpacingTop} />
      )}
    </div>
  )
}
