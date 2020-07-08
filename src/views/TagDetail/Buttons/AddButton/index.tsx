import {
  Button,
  DropdownDialog,
  IconAddMedium,
  IconHashTag,
  IconPen,
  Menu,
  TextIcon,
  Translate,
} from '~/components'

import TagArticleDialog from './TagArticleDialog'

interface DropdownActionsProps {
  id: string
}

interface DialogProps {
  openTagSelectedArticleDialog: () => void
  openTagArticleDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  id,
  openTagSelectedArticleDialog,
  openTagArticleDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openTagSelectedArticleDialog}>
        <TextIcon icon={<IconAddMedium size="md" />} size="md" spacing="base">
          <Translate id="tagAddSelectedArticle" />
        </TextIcon>
      </Menu.Item>
      <Menu.Divider spacing="xtight" />
      <Menu.Item onClick={openTagArticleDialog}>
        <TextIcon icon={<IconAddMedium size="md" />} size="md" spacing="base">
          <Translate zh_hant="創作新的作品" zh_hans="创作新的作品" />
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={openTagArticleDialog}>
        <TextIcon icon={<IconHashTag size="md" />} size="md" spacing="base">
          <Translate id="tagAddArticle" />
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
        title: 'moreActions',
      }}
    >
      {({ open, ref }) => (
        <Button
          size={['7rem', '2.25rem']}
          textColor="gold"
          textActiveColor="white"
          bgActiveColor="gold"
          borderColor="gold"
          onClick={open}
          aria-haspopup="true"
          ref={ref}
        >
          <TextIcon icon={<IconPen />} weight="md" size="md-s">
            <Translate id="addArticleTag" />
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  return (
    <TagArticleDialog id={props.id} forSelected>
      {({ open: openTagSelectedArticleDialog }) => (
        <TagArticleDialog id={props.id}>
          {({ open: openTagArticleDialog }) => (
            <BaseDropdownActions
              {...props}
              openTagSelectedArticleDialog={openTagSelectedArticleDialog}
              openTagArticleDialog={openTagArticleDialog}
            />
          )}
        </TagArticleDialog>
      )}
    </TagArticleDialog>
  )
}

export default DropdownActions
