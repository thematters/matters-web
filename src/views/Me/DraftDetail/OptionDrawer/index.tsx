import { useEffect } from 'react'
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
  draftViewer,
  campaigns,
  ownCircles,
  ownCollections,
  loadMoreCollections,
}) => {
  const intl = useIntl()

  const defaultTitle = intl.formatMessage({
    defaultMessage: 'Options',
    id: 'NDV5Mq',
  })

  useEffect(() => {
    const handleOpenDrawer = (event: Event) => {
      const customEvent = event as CustomEvent<{
        type: string
        id: string
        name: string
      }>
      console.log('event', customEvent.detail)
      onClose()
    }
    window.addEventListener('open-drawer', handleOpenDrawer)
    return () => window.removeEventListener('open-drawer', handleOpenDrawer)
  }, [])

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
          draftViewer={draftViewer}
          campaigns={campaigns}
          ownCircles={ownCircles}
          ownCollections={ownCollections}
          loadMoreCollections={loadMoreCollections}
        />
        {children}
      </Drawer.Content>
    </Drawer>
  )
}
