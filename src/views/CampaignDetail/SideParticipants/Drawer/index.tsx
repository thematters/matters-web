import { useIntl } from 'react-intl'

import { Drawer } from '~/components'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  shortHash: string
}

export const ParticipantsDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  shortHash,
}) => {
  const intl = useIntl()
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <Drawer.Header
        title={intl.formatMessage({
          defaultMessage: 'Comment',
          description: 'src/views/ArticleDetail/index.tsx',
          id: 'OsX3KM',
        })}
        closeDrawer={onClose}
      />
      <Drawer.Content fixedWidth>{shortHash}</Drawer.Content>
    </Drawer>
  )
}
