import { describe, expect, it, vi } from 'vitest'

import { signupCallbackUrl } from './oauth'

describe('utils/oauth', () => {
  vi.stubEnv('NEXT_PUBLIC_SITE_DOMAIN', 'web-dev.matters.town')

  it('should get signupCallbackUrl correctly', () => {
    expect(signupCallbackUrl('email', 'code')).toEqual(
      'https://web-dev.matters.town/callback/email-signup?email=email&referral=code'
    )
    expect(signupCallbackUrl('email')).toEqual(
      'https://web-dev.matters.town/callback/email-signup?email=email'
    )
  })
})
