import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import IconEdit from '@/public/static/icons/24px/edit.svg'
import IconMore from '@/public/static/icons/24px/more.svg'
import { toPath } from '~/common/utils'
import { Button, Dropdown, Icon, Menu } from '~/components'
import { EditorPreviewDialog } from '~/components/Editor/PreviewDialog'
import { DraftDigestDropdownActionsDraftFragment } from '~/gql/graphql'

import DeleteDraft from './DeleteDraft'
import SchedulePublish from './SchedulePublish'

const fragments = {
  draft: gql`
    fragment DraftDigestDropdownActionsDraft on Draft {
      id
      ...DeleteButtonDraft
      ...EditorPreviewDialogDraft
    }
    ${DeleteDraft.fragments.draft}
    ${SchedulePublish.fragments.draft}
    ${EditorPreviewDialog.fragment}
  `,
}

type DropdownActionsProps = {
  draft: DraftDigestDropdownActionsDraftFragment
}

const DropdownActions = (props: DropdownActionsProps) => {
  const intl = useIntl()
  const path = toPath({ page: 'draftDetail', id: props.draft.id })

  const Content = ({
    openDeleteDialog,
    openSchedulePublishDialog,
  }: {
    openDeleteDialog: () => void
    openSchedulePublishDialog: () => void
  }) => (
    <Menu>
      <Menu.Item
        text={intl.formatMessage({
          defaultMessage: 'Edit',
          id: 'kAtrEq',
          description:
            'src/components/DraftDigest/Feed/DropdownActions/index.tsx',
        })}
        icon={<Icon icon={IconEdit} size={20} />}
        href={path.href}
      />

      <SchedulePublish.Button openDialog={openSchedulePublishDialog} />
      <DeleteDraft.Button openDialog={openDeleteDialog} />
    </Menu>
  )

  return (
    <SchedulePublish.Dialog draft={props.draft}>
      {({ openDialog: openSchedulePublishDialog }) => (
        <DeleteDraft.Dialog draft={props.draft}>
          {({ openDialog: openDeleteDialog }) => (
            <Dropdown
              content={
                <Content
                  openDeleteDialog={openDeleteDialog}
                  openSchedulePublishDialog={openSchedulePublishDialog}
                />
              }
            >
              {({ openDropdown, ref }) => (
                <Button
                  onClick={openDropdown}
                  textColor="greyDarker"
                  textActiveColor="black"
                  aria-label={intl.formatMessage({
                    defaultMessage: 'More Actions',
                    id: 'A7ugfn',
                  })}
                  aria-haspopup="listbox"
                  ref={ref}
                >
                  <Icon icon={IconMore} size={22} />
                </Button>
              )}
            </Dropdown>
          )}
        </DeleteDraft.Dialog>
      )}
    </SchedulePublish.Dialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
