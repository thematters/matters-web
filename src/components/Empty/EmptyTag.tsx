import { FormattedMessage } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import { Empty, ERROR_MESSAGES, IconHashTag16 } from '~/components'

export const EmptyTag = ({
  description,
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<IconHashTag16 size="xxl" />}
    description={
      description || (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.TAG_NOT_FOUND]} />
      )
    }
  />
)
