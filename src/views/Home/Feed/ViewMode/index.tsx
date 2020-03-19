import { useQuery } from '@apollo/react-hooks'

import {
  Button,
  DropdownDialog,
  Icon,
  Menu,
  TextIcon,
  Translate
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { STORE_KEY_VIEW_MODE } from '~/common/enums'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

type ViewMode = 'default' | 'comfortable' | 'compact'

const ViewMode = () => {
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' }
  })
  const { viewMode } = data?.clientPreference || { viewMode: 'default' }
  const isDefaultMode = viewMode === 'default'
  const isComfortableMode = viewMode === 'comfortable'
  const isCompactMode = viewMode === 'compact'

  const setViewMode = (mode: ViewMode) => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { viewMode: mode }
      })
    }

    localStorage.setItem(STORE_KEY_VIEW_MODE, mode)
  }

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={() => setViewMode('default')}>
        <TextIcon
          icon={<Icon.ViewModeDefault size="md" />}
          size="md"
          spacing="base"
        >
          <Translate zh_hant="默認（大圖）" zh_hans="默认（大图）" />
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={() => setViewMode('comfortable')}>
        <TextIcon
          icon={<Icon.ViewModeComfortable size="md" />}
          size="md"
          spacing="base"
        >
          <Translate zh_hant="標準（小圖）" zh_hans="标准（小图）" />
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={() => setViewMode('compact')}>
        <TextIcon
          icon={<Icon.ViewModeCompact size="md" />}
          size="md"
          spacing="base"
        >
          <Translate zh_hant="緊湊（無圖）" zh_hans="紧凑（无图）" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end'
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions'
      }}
    >
      {({ open, ref }) => (
        <Button
          size={['3rem', '2rem']}
          bgColor="grey-lighter"
          compensation="right"
          aria-haspopup="true"
          aira-label="切換瀏覽視圖"
          onClick={open}
          ref={ref}
        >
          {isDefaultMode && <Icon.ViewModeDefault size="md" color="grey" />}
          {isComfortableMode && (
            <Icon.ViewModeComfortable size="md" color="grey" />
          )}
          {isCompactMode && <Icon.ViewModeCompact size="md" color="grey" />}
        </Button>
      )}
    </DropdownDialog>
  )
}

export default ViewMode
