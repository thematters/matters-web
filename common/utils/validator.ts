import { isEmail } from 'validator'

/**
 * Validate email address.
 */
export const isValidEmail = isEmail

/**
 * Validate user raw pass word. It only accepts alphabets and numbers.
 *
 * @see https://mattersnews.slack.com/archives/G8877EQMS/p1546446430005500
 */
export const isValidPassword = (password: string): boolean => {
  if (!password || password.length < 8) {
    return false
  }
  return /^[a-zA-Z0-9]*$/.test(password)
}
