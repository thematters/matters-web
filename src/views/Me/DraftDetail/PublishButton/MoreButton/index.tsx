import { FormattedMessage } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import IconTime from '@/public/static/icons/24px/time.svg'
import { BREAKPOINTS } from '~/common/enums'
import {
  Button,
  Dropdown,
  Icon,
  Menu,
  TextIcon,
  useMediaQuery,
} from '~/components'
import { SchedulePublishDialog } from '~/components/Editor/SchedulePublishDialog'
import { EditorPreviewDialogDraftFragment } from '~/gql/graphql'

interface MoreButtonProps {
  draft: EditorPreviewDialogDraftFragment
  disabled?: boolean
  onConfirmSchedulePublish: (date: Date) => void
}

export const MoreButton = ({
  draft,
  disabled,
  onConfirmSchedulePublish,
}: MoreButtonProps) => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  return (
    <SchedulePublishDialog draft={draft} onConfirm={onConfirmSchedulePublish}>
      {({ openDialog }) => (
        <Dropdown
          content={
            <Menu>
              <Menu.Item
                icon={<Icon icon={IconTime} size={20} />}
                text={
                  <FormattedMessage
                    defaultMessage="Schedule Publish"
                    id="Km6eJ2"
                  />
                }
                onClick={openDialog}
                ariaHasPopup="dialog"
              />
            </Menu>
          }
        >
          {({ openDropdown, ref }) => (
            <Button
              size={[null, isSmUp ? '2.375rem' : '2.125rem']}
              spacing={[0, 14]}
              borderRadius={'0.75rem'}
              bgColor={disabled ? 'grey' : 'black'}
              onClick={openDropdown}
              disabled={disabled}
              ref={ref}
              aria-label={
                <FormattedMessage defaultMessage="More Actions" id="A7ugfn" />
              }
              aria-haspopup="listbox"
            >
              <TextIcon
                color="white"
                icon={<Icon icon={IconDown} size={18} />}
                spacing={8}
              />
            </Button>
          )}
        </Dropdown>
      )}
    </SchedulePublishDialog>
  )
}
