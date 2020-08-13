import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAddMedium,
  IconHashTag,
  IconPen,
  IconSpinner,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
} from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { useMutation } from '~/components/GQL'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'

import { translate } from '~/common/utils'

import CreateDraftMenuItem from './CreateDraftMenuItem'
import TagArticleDialog from './TagArticleDialog'

import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'
import { TagDetailPublic_node_Tag } from '../../__generated__/TagDetailPublic'

interface DropdownActionsProps {
  isMaintainer: boolean
  tag: TagDetailPublic_node_Tag
}

interface DialogProps {
  openTagSelectedArticleDialog: () => void
  openSearchDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  isMaintainer,
  tag,
  openTagSelectedArticleDialog,
  openSearchDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)
  const [putDraft, { loading }] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang }),
      tags: [tag.content],
    },
  })

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {isMaintainer && (
        <>
          <Menu.Item onClick={openTagSelectedArticleDialog}>
            <TextIcon
              icon={<IconAddMedium size="md" />}
              size="md"
              spacing="base"
            >
              <Translate id="tagAddSelectedArticle" />
            </TextIcon>
          </Menu.Item>
          <Menu.Divider spacing="xtight" />
        </>
      )}

      <CreateDraftMenuItem putDraft={putDraft} />

      <Menu.Item onClick={openSearchDialog}>
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
          <TextIcon
            icon={loading ? <IconSpinner /> : <IconPen />}
            weight="md"
            size="md-s"
          >
            <Translate id="addArticleTag" />
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  return (
    <SearchSelectDialog
      title="tagAddArticle"
      onSave={(items) => console.log(items)}
      searchType="Article"
    >
      {({ open: openSearchDialog }) => (
        <TagArticleDialog tag={props.tag} forSelected>
          {({ open: openTagSelectedArticleDialog }) => (
            <BaseDropdownActions
              {...props}
              openTagSelectedArticleDialog={openTagSelectedArticleDialog}
              openSearchDialog={openSearchDialog}
            />
          )}
        </TagArticleDialog>
      )}
    </SearchSelectDialog>
  )
}

export default DropdownActions
