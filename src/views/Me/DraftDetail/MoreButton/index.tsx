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
import { EditMetaDraftFragment } from '~/gql/graphql'

interface MoreButtonProps {
  draft: EditMetaDraftFragment
  publishable: boolean
}

export const MoreButton = ({ draft, publishable }: MoreButtonProps) => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const disabled = !publishable || isPending || isPublished

  return (
    <SchedulePublishDialog>
      {({ openDialog }) => (
        <Dropdown
          content={
            <Menu>
              <Menu.Item
                icon={<Icon icon={IconTime} size={20} />}
                text={
                  <FormattedMessage
                    defaultMessage="Schedule publish"
                    id="CbRvzm"
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
              bgColor="black"
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
