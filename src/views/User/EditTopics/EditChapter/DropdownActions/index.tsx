import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconDelete24,
  IconEdit16,
  IconMore32,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
} from '~/components'

import { translate } from '~/common/utils'

import DeleteChapterDialog from '../../Dialogs/DeleteChapterDialog'
import PutChapterDialog from '../../Dialogs/PutChapterDialog'
import { fragments } from './gql'

import { DropdownActionsChapter } from './__generated__/DropdownActionsChapter'

interface DropdownActionsProps {
  chapter: DropdownActionsChapter
}

interface DialogProps {
  openPutChapterDialog: () => void
  openDeleteChapterDialog: () => void
}

type BaseDropdownActionsProps = DialogProps

const BaseDropdownActions = ({
  openPutChapterDialog,
  openDeleteChapterDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openPutChapterDialog}>
        <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
          <Translate id="editChapter" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item onClick={openDeleteChapterDialog}>
        <TextIcon icon={<IconDelete24 size="md" />} size="md" spacing="base">
          <Translate id="deleteChapter" />
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
      {({ openDialog, ref }) => (
        <Button
          aria-label={translate({ id: 'moreActions', lang })}
          aria-haspopup="true"
          onClick={openDialog}
          ref={ref}
        >
          <IconMore32 size="lg" color="black" />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = ({ chapter }: DropdownActionsProps) => {
  const topicId = chapter.topic.id

  return (
    <PutChapterDialog topicId={topicId} chapter={chapter}>
      {({ openDialog: openPutChapterDialog }) => (
        <DeleteChapterDialog chapter={chapter}>
          {({ openDialog: openDeleteChapterDialog }) => (
            <BaseDropdownActions
              openDeleteChapterDialog={openDeleteChapterDialog}
              openPutChapterDialog={openPutChapterDialog}
            />
          )}
        </DeleteChapterDialog>
      )}
    </PutChapterDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
