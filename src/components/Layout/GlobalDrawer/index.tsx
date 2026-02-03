import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { OPEN_GLOBAL_NOTICE_DRAWER } from '~/common/enums'
import { Media, useEventListener, ViewerContext } from '~/components'

const DynamicNoticeDrawer = dynamic(
  () => import('./NoticeDrawer').then((mod) => mod.NoticeDrawer),
  {
    ssr: false,
  }
)

const GlobalDrawer = () => {
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed

  const [isOpenNotice, setIsOpenNotice] = useState(false)
  const toggleNoticeDrawer = () => {
    setIsOpenNotice((prevState) => !prevState)
  }

  useEventListener(OPEN_GLOBAL_NOTICE_DRAWER, () => {
    toggleNoticeDrawer()
  })

  return (
    <Media greaterThanOrEqual="md">
      {isAuthed && (
        <DynamicNoticeDrawer
          isOpen={isOpenNotice}
          onClose={toggleNoticeDrawer}
        />
      )}
    </Media>
  )
}

export default GlobalDrawer
