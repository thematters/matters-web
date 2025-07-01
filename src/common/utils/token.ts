import { Base64 } from 'js-base64'

/**
 * JWT utilities for client-side token handling
 * Note: These functions do NOT verify JWT signatures - they only decode for metadata
 */

interface JWTPayload {
  exp: number
  iat: number
  [key: string]: unknown
}

/**
 * Decode JWT token without verification (client-side only)
 * @param token JWT token string
 * @returns Decoded payload or null if invalid
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const payload = parts[1]

    return JSON.parse(Base64.decode(payload))
  } catch (error) {
    console.warn('Failed to decode JWT:', error)
    return null
  }
}

/**
 * Get token expiration time in milliseconds
 * @param token JWT token string
 * @returns Expiration timestamp in milliseconds or null if invalid
 */
export const getTokenExpiration = (token: string): number | null => {
  const payload = decodeJWT(token)
  if (!payload?.exp) {
    return null
  }

  return payload.exp * 1000 // Convert to milliseconds
}

/**
 * Check if token is expired
 * @param token JWT token string
 * @returns true if expired, false if valid, null if invalid token
 */
export const isTokenExpired = (token: string): boolean | null => {
  const expiration = getTokenExpiration(token)
  if (expiration === null) {
    return null
  }

  return Date.now() >= expiration
}
