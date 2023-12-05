import { useEffect, useLayoutEffect } from 'react'

// Beware of flickering problems when using useLayoutEffect on the server.
// ref: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85?permalink_comment_id=4248531#gistcomment-4248531
export const useIsomorphicLayoutEffect =
  typeof window !== undefined ? useLayoutEffect : useEffect
