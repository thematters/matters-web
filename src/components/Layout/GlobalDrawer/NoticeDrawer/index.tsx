import { useContext } from 'react'
import { useIntl } from 'react-intl'

import { Drawer, ViewerContext } from '~/components'

import Notices from '../Notices'

type NoticeDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export const NoticeDrawer: React.FC<NoticeDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed

  const intl = useIntl()
  return (
    <Drawer isOpen={isOpen} onClose={onClose} spacing={40}>
      <Drawer.Header
        title={intl.formatMessage({
          defaultMessage: 'Notifications',
          id: 'NAidKb',
        })}
        closeDrawer={onClose}
        fixedWidth
      />
      <Drawer.Content fixedWidth>
        {isAuthed && <Notices isOpen={isOpen} />}
      </Drawer.Content>
    </Drawer>
  )
}
