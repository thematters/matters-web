import { COOKIE_TOKEN_NAME } from '~/common/enums'
import { getIsomorphicCookie } from '~/common/utils'

export const getRootQueryPrivateVariables = (cookie: string) => ({
  includeViewerOss: !!getIsomorphicCookie(cookie, COOKIE_TOKEN_NAME),
})
