import { FormattedMessage } from 'react-intl'

import IconHashTag from '@/public/static/icons/24px/hashtag.svg'
import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { Empty, Icon } from '~/components'

export const EmptyTag = ({
  description,
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<Icon icon={IconHashTag} size={64} />}
    description={
      description || (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.TAG_NOT_FOUND]} />
      )
    }
  />
)
