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

export const hashToProbability = (hash: string): number => {
  // Convert each character to its numeric value in base 36 (0-9, a-z) and sum them up
  let sum = 0
  for (let i = 0; i < hash.length; i++) {
    // Convert character to its base-36 value (0-35)
    const charValue = parseInt(hash[i], 36)
    if (!isNaN(charValue)) {
      sum += charValue
    }
  }

  // Normalize the sum to a value between 0 and 1
  // We divide by (hash.length * 35) which is the maximum possible sum
  // (if every character was 'z', which is 35 in base 36)
  return sum / (hash.length * 35)
}
