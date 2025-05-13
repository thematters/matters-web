import { useIntl } from 'react-intl'

import { Drawer } from '~/components'

import { OptionContent } from '../OptionContent'

type OptionDrawerProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export const OptionDrawer: React.FC<OptionDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const intl = useIntl()

  const defaultTitle = intl.formatMessage({
    defaultMessage: 'Options',
    id: 'NDV5Mq',
  })

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <Drawer.Header
        title={title || defaultTitle}
        closeDrawer={onClose}
        fixedWidth
      />
      <Drawer.Content fixedWidth>
        <OptionContent />
        {children}
      </Drawer.Content>
    </Drawer>
  )
}
