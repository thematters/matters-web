import { useIntl } from 'react-intl'

import { Drawer } from '~/components'

import { OptionContent, OptionContentProps } from '../OptionContent'

type OptionDrawerProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
} & OptionContentProps

export const OptionDrawer: React.FC<OptionDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  draft,
  campaigns,
  ownCircles,
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
        <OptionContent
          draft={draft}
          campaigns={campaigns}
          ownCircles={ownCircles}
        />
        {children}
      </Drawer.Content>
    </Drawer>
  )
}
