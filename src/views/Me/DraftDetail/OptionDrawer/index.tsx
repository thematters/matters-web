import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { KEYVALUE } from '~/common/enums'
import { Drawer, useNativeEventListener, useRoute } from '~/components'

import { getOptionTabByType, OptionTab } from '../hooks'
import { OptionContent, OptionContentProps } from '../OptionContent'

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
  const { getQuery, removeQuery } = useRoute()

  const defaultTitle = intl.formatMessage({
    defaultMessage: 'Options',
    id: 'NDV5Mq',
  })

  const isInDraftOptions = getQuery('page') === 'options'

  const [tab, setTab] = useState<OptionTab>('contentAndLayout')

  useEffect(() => {
    if (isInDraftOptions) {
      toggleDrawer()
      setTab(getOptionTabByType(getQuery('type')))
      removeQuery(['page', 'type'])
    }
  }, [isInDraftOptions])

  useEffect(() => {
    const handleOpenDrawer = (event: Event) => {
      const customEvent = event as CustomEvent<{
        type: string
      }>
      const type = customEvent.detail.type
      setTab(getOptionTabByType(type))
      toggleDrawer()
    }
    window.addEventListener('open-drawer', handleOpenDrawer)
    return () => window.removeEventListener('open-drawer', handleOpenDrawer)
  }, [])

  // Keyboard shortcuts for open/close comment drawer
  useNativeEventListener('keydown', (event: KeyboardEvent) => {
    // skip if current focus is on another input element,
    const target = event.target as HTMLElement
    if (
      target.tagName.toLowerCase() === 'input' ||
      target.tagName.toLowerCase() === 'textarea' ||
      target.contentEditable === 'true'
    ) {
      return
    }

    const keyCode = event.code.toLowerCase()

    if (keyCode === KEYVALUE.escape && isOpen) {
      toggleDrawer()
    }
  })

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
