import { useQuery } from '@apollo/react-hooks'

import {
  DropdownDialog,
  Form,
  IconViewModeComfortable,
  IconViewModeCompact,
  IconViewModeDefault,
  Menu,
  TextIcon,
  Translate,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { STORE_KEY_VIEW_MODE } from '~/common/enums'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

export type ViewModeType = 'default' | 'comfortable' | 'compact'

const ViewMode = () => {
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const { viewMode } = data?.clientPreference || { viewMode: 'comfortable' }
  const isDefaultMode = viewMode === 'default'
  const isComfortableMode = viewMode === 'comfortable'
  const isCompactMode = viewMode === 'compact'

  const setViewMode = (mode: ViewModeType) => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { viewMode: mode },
      })
    }

    localStorage.setItem(STORE_KEY_VIEW_MODE, mode)
  }

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={() => setViewMode('default')}>
        <TextIcon
          icon={<IconViewModeDefault size="md" />}
          size="md"
          spacing="base"
          weight={isDefaultMode ? 'bold' : 'normal'}
        >
          <Translate id="viewModeDefault" />
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={() => setViewMode('comfortable')}>
        <TextIcon
          icon={<IconViewModeComfortable size="md" />}
          size="md"
          spacing="base"
          weight={isComfortableMode ? 'bold' : 'normal'}
        >
          <Translate id="viewModeComfortable" />
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={() => setViewMode('compact')}>
        <TextIcon
          icon={<IconViewModeCompact size="md" />}
          size="md"
          spacing="base"
          weight={isCompactMode ? 'bold' : 'normal'}
        >
          <Translate id="viewModeCompact" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'switchViewMode',
      }}
    >
      {({ open, ref }) => (
        <Form.List.Item
          title={<Translate id="viewMode" />}
          onClick={open}
          rightText={
            <span key={viewMode || ''}>
              {isDefaultMode ? (
                <Translate id="viewModeDefault" />
              ) : isComfortableMode ? (
                <Translate id="viewModeComfortable" />
              ) : (
                <Translate id="viewModeCompact" />
              )}
            </span>
          }
          ref={ref}
        />
      )}
    </DropdownDialog>
  )
}

export default ViewMode
