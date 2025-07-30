import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Drawer } from '~/components'

import { getOptionTabByType, OptionTab } from '../Hooks'
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
  article,
  campaigns,
  ownCircles,
  ownCollections,
  ...props
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
      setTab(getOptionTabByType(type))
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
          article={article}
          campaigns={campaigns}
          ownCircles={ownCircles}
          ownCollections={ownCollections}
          {...props}
        />
        {children}
      </Drawer.Content>
    </Drawer>
  )
}
