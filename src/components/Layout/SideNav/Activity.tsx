import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconComment } from '@/public/static/icons/24px/comment.svg'
import { ReactComponent as IconEdit } from '@/public/static/icons/24px/edit.svg'
import { PATHS } from '~/common/enums'
import { Icon } from '~/components/Icon'
import { Menu } from '~/components/Menu'

const ActivityPopover: React.FC = () => {
  return (
    <Menu>
      <Menu.Item
        text={<FormattedMessage defaultMessage="New Journal" id="subQNF" />}
        icon={<Icon icon={IconComment} size={20} />}
        is="link"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Write Articles" id="Xj0yv9" />}
        icon={<Icon icon={IconEdit} size={20} />}
        href={PATHS.ME_DRAFT_NEW}
        is="link"
      />
    </Menu>
  )
}

export default ActivityPopover
