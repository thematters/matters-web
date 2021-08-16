import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'

import {
  Button,
  DropdownDialog,
  IconAnnouncementAll24,
  IconAnnouncementCommunity24,
  IconAnnouncementProduct24,
  IconAnnouncementSeminar24,
  IconArrowDown16,
  Menu,
  TextIcon,
  Translate,
} from '~/components'

type ControlsProps = {
  hasCommunity: boolean
  hasProduct: boolean
  hasSeminar: boolean
}

type ContentProps = {
  setType: (type: string) => void
  isInDropdown?: boolean
} & ControlsProps

export type DropdownActionsProps = {
  type: string
  setType: (type: string) => void
} & ControlsProps

const TypeLabel = ({ type }: { type: string }) => {
  switch (type) {
    case 'community': {
      return <Translate zh_hant="社區" zh_hans="社区" en="Community" />
    }
    case 'product': {
      return <Translate zh_hant="產品" zh_hans="产品" en="Product" />
    }
    case 'seminar': {
      return <Translate zh_hant="講座" zh_hans="讲座" en="Seminar" />
    }
    default: {
      return <Translate zh_hant="全部" zh_hans="全部" en="All" />
    }
  }
}

const Content = ({
  isInDropdown,
  setType,
  hasCommunity,
  hasProduct,
  hasSeminar,
}: ContentProps) => {
  return (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={() => setType('all')}>
        <TextIcon
          icon={<IconAnnouncementAll24 size="md" />}
          size="md"
          spacing="base"
        >
          <TypeLabel type="all" />
        </TextIcon>
      </Menu.Item>

      {hasProduct && (
        <Menu.Item onClick={() => setType('product')}>
          <TextIcon
            icon={<IconAnnouncementProduct24 size="md" />}
            size="md"
            spacing="base"
          >
            <TypeLabel type="product" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasSeminar && (
        <Menu.Item onClick={() => setType('seminar')}>
          <TextIcon
            icon={<IconAnnouncementSeminar24 size="md" />}
            size="md"
            spacing="base"
          >
            <TypeLabel type="seminar" />
          </TextIcon>
        </Menu.Item>
      )}

      {hasCommunity && (
        <Menu.Item onClick={() => setType('community')}>
          <TextIcon
            icon={<IconAnnouncementCommunity24 size="md" />}
            size="md"
            spacing="base"
          >
            <TypeLabel type="community" />
          </TextIcon>
        </Menu.Item>
      )}
    </Menu>
  )
}

const DropdownActions = ({
  type,
  setType,
  ...controlsProps
}: DropdownActionsProps) => {
  return (
    <DropdownDialog
      dropdown={{
        content: <Content setType={setType} isInDropdown {...controlsProps} />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content setType={setType} {...controlsProps} />,
        title: (
          <Translate zh_hant="公告類別" zh_hans="公告类别" en="Announcement" />
        ),
      }}
    >
      {({ openDialog, ref }) => (
        <Button
          ref={ref}
          bgColor="half-black"
          size={['4rem', '1.75rem']}
          onClick={openDialog}
        >
          <TextIcon
            icon={<IconArrowDown16 size="xs" />}
            color="white"
            size="xs"
            spacing="xxtight"
            textPlacement="left"
          >
            <TypeLabel type={type} />
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}

export default DropdownActions
