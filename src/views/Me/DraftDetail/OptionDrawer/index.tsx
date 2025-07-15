import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Drawer } from '~/components'

import { OptionContent, OptionContentProps, OptionTab } from '../OptionContent'

type OptionDrawerProps = {
  isOpen: boolean
  toggleDrawer: () => void
  title?: string
  children?: React.ReactNode
} & OptionContentProps

export const OptionDrawer: React.FC<OptionDrawerProps> = ({
  isOpen,
  toggleDrawer,
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

  const [tab, setTab] = useState<OptionTab>('contentAndLayout')

  useEffect(() => {
    const handleOpenDrawer = (event: Event) => {
      const customEvent = event as CustomEvent<{
        type: string
      }>
      const type = customEvent.detail.type
      if (
        type === 'campaign' ||
        type === 'tags' ||
        type === 'connections' ||
        type === 'collections' ||
        type === undefined
      ) {
        setTab('contentAndLayout')
      } else {
        setTab('settings')
      }
      toggleDrawer()
    }
    window.addEventListener('open-drawer', handleOpenDrawer)
    return () => window.removeEventListener('open-drawer', handleOpenDrawer)
  }, [])

  return (
    <Drawer isOpen={isOpen} onClose={toggleDrawer}>
      <Drawer.Header
        title={title || defaultTitle}
        closeDrawer={toggleDrawer}
        fixedWidth
      />
      <Drawer.Content fixedWidth>
        <OptionContent
          tab={tab}
          setTab={setTab}
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
