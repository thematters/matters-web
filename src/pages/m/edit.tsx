import { useContext } from 'react'

import { BREAKPOINTS, URL_USER_PROFILE } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Protected, useMediaQuery, useRoute, ViewerContext } from '~/components'
import MomentDetailEdit from '~/views/MomentDetail/Edit'

const ProtectedMomentDetailEdit = () => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
  const viewer = useContext(ViewerContext)
  const { router } = useRoute()
  const userProfilePath = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  })

  const openMomentFormPath =
    typeof window !== 'undefined'
      ? `${window.location.origin}${userProfilePath.href}?${URL_USER_PROFILE.OPEN_POST_MOMENT_FORM.key}=${URL_USER_PROFILE.OPEN_POST_MOMENT_FORM.value}`
      : ''

  if (isSmUp && viewer.isAuthed) {
    router.replace(openMomentFormPath)
    return null
  }

  return (
    <Protected>
      <MomentDetailEdit />
    </Protected>
  )
}

export default ProtectedMomentDetailEdit
