import { useEffect, useRef } from 'react'

import { COOKIE_ACCESS_TOKEN_EXPIRES_AT, MINUTE } from '~/common/enums'
import { clearAuthCookies, getCookie, setAuthCookies } from '~/common/utils'
import { useMutation } from '~/components'
import { REFRESH_TOKEN } from '~/components/GQL/mutations/refreshToken'
import { RefreshTokenMutation } from '~/gql/graphql'

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

        const newAccessToken = data.refreshToken.accessToken || ''
        const newRefreshToken = data.refreshToken.refreshToken || ''
        const language = data.refreshToken.user?.settings.language || ''
        const group = data.refreshToken.user?.info.group || ''

        setAuthCookies({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          language,
          group,
        })

        isRefreshingRef.current = false

        console.log('[TokenExpirationChecker] Tokens refreshed successfully')
      },
      onError: (error) => {
        console.error('[TokenExpirationChecker] Token refresh failed:', error)

        // Clear tokens on refresh failure
        clearAuthCookies()

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

    const expiration = getCookie(COOKIE_ACCESS_TOKEN_EXPIRES_AT)
    const expirationTime = expiration ? parseInt(expiration, 10) : null
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
    intervalRef.current = setInterval(checkTokenExpiration, CHECK_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

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
