import { useContext } from 'react'

import { FeaturesContext } from '~/components'

/**
 * This hook is a wrapper of accessing feature flag context.
 *
 * Usage:
 *
 * ```jsx
 *   const features = useFeatures()
 * ```
 */
export const useFeatures = () => {
  const features = useContext(FeaturesContext)
  return features
}
