import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconEmptyComment } from '@/public/static/icons/empty-comment.svg'
import { Empty, withIcon } from '~/components'

export const EmptyComment = ({
  description,
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={withIcon(IconEmptyComment)({ size: 88 })}
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
