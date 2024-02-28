import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconComment88 } from '@/public/static/icons/88px/comment.svg'
import { Empty, withIcon } from '~/components'

export const EmptyComment = ({
  description,
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={withIcon(IconComment88)({ size: 'xxxlM' })}
    spacingY="loose"
    description={
      description || (
        <FormattedMessage
          defaultMessage="Still quiet here. {br}Be the first one to say hello!"
          id="7ykJ+l"
          description="src/components/Empty/EmptyComment.tsx"
          values={{
            br: <br />,
          }}
        />
      )
    }
  />
)
