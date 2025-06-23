import { useEffect, useRef } from 'react'

import { COOKIE_LANGUAGE, COOKIE_USER_GROUP, MINUTE } from '~/common/enums'
import {
  clearAuthTokens,
  getAccessTokenExpiration,
  setAuthTokens,
  setCookies,
} from '~/common/utils'
import { useMutation } from '~/components'
import { REFRESH_TOKEN } from '~/components/GQL/mutations/refreshToken'
import { RefreshTokenMutation } from '~/gql/graphql'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

const REFRESH_THRESHOLD = 10 * MINUTE // 10 minutes
const CHECK_INTERVAL = MINUTE // 1 minute

export const TokenExpirationChecker = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isRefreshingRef = useRef(false)

  const [refreshToken, { loading }] = useMutation<RefreshTokenMutation>(
    REFRESH_TOKEN,
    {
      onCompleted: (data) => {
        if (!data?.refreshToken) {
          return
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data.refreshToken

        if (newAccessToken && newRefreshToken) {
          if (isLocal || process.env.NEXT_PUBLIC_VERCEL) {
            setAuthTokens(newAccessToken, newRefreshToken)

            setCookies({
              [COOKIE_LANGUAGE]:
                data.refreshToken.user?.settings.language || '',
              [COOKIE_USER_GROUP]: data.refreshToken.user?.info.group || '',
            })
          }

          isRefreshingRef.current = false

          console.log('[TokenExpirationChecker] Tokens refreshed successfully')
        }
      },
      onError: (error) => {
        console.error('[TokenExpirationChecker] Token refresh failed:', error)

        // Clear tokens on refresh failure
        clearAuthTokens()

        isRefreshingRef.current = false
      },
    },
    { showToast: false, showLoginToast: false }
  )

  const checkTokenExpiration = () => {
    // Skip if already refreshing
    if (isRefreshingRef.current || loading) {
      return
    }

    const expirationTime = getAccessTokenExpiration()
    if (!expirationTime) {
      // No token expiration found, skip check
      return
    }

    const now = Date.now()
    const timeUntilExpiry = expirationTime - now

    // Check if token is expired or will expire soon
    if (timeUntilExpiry <= REFRESH_THRESHOLD) {
      isRefreshingRef.current = true
      refreshToken()
    }
  }

  useEffect(() => {
    // Initial check
    checkTokenExpiration()

    // Set up interval
    intervalRef.current = setInterval(checkTokenExpiration, CHECK_INTERVAL)

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  })

  // Add visibility change listener to check tokens when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkTokenExpiration()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null
}

export default TokenExpirationChecker
