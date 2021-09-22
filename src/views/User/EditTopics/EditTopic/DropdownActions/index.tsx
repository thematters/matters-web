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

import DeleteTopicsDialog from '../../DeleteTopicsDialog'
import PutTopicDialog from '../../PutTopicDialog'

import { PutTopicDialogTopic } from '../../PutTopicDialog/__generated__/PutTopicDialogTopic'

interface DropdownActionsProps {
  topic: PutTopicDialogTopic
}

interface DialogProps {
  openPutTopicDialog: () => void
  openDeleteTopicsDialog: () => void
}

type BaseDropdownActionsProps = DialogProps

const BaseDropdownActions = ({
  openPutTopicDialog,
  openDeleteTopicsDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openPutTopicDialog}>
        <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
          <Translate id="editTopic" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item onClick={openDeleteTopicsDialog}>
        <TextIcon icon={<IconDelete24 size="md" />} size="md" spacing="base">
          <Translate id="deleteTopic" />
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

const DropdownActions = ({ topic }: DropdownActionsProps) => {
  return (
    <PutTopicDialog topic={topic}>
      {({ openDialog: openPutTopicDialog }) => (
        <DeleteTopicsDialog topicIds={[topic.id]}>
          {({ openDialog: openDeleteTopicsDialog }) => (
            <BaseDropdownActions
              openDeleteTopicsDialog={openDeleteTopicsDialog}
              openPutTopicDialog={openPutTopicDialog}
            />
          )}
        </DeleteTopicsDialog>
      )}
    </PutTopicDialog>
  )
}

export default DropdownActions
