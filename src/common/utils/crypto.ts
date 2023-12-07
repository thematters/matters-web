export const generateChallenge = async (code_verifier: string) => {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(code_verifier)
  )
  // Generate base64url string
  // btoa is deprecated in Node.js but is used here for web browser compatibility
  // (which has no good replacement yet, see also https://github.com/whatwg/html/issues/6811)
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\//g, '_')
    .replace(/\+/g, '-')
    .replace(/=/g, '')
}

export const randomString = (length = 9) =>
  Math.random().toString(36).substr(2, length)
