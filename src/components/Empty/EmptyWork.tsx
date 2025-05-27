import { useIntl } from 'react-intl'

import IconEmptyWork from '@/public/static/icons/empty-work.svg'
import { Empty, withIcon } from '~/components'

export const EmptyWork = ({
  isMe,
  description,
}: {
  isMe?: boolean
  description?: React.ReactNode
}) => {
  const intl = useIntl()

  return (
    <Empty
      spacingY="xxloose"
      icon={withIcon(IconEmptyWork)({ size: 88 })}
      description={
        description ||
        intl.formatMessage({
          defaultMessage: 'No works here yet',
          id: '7XWzvD',
          description: 'src/components/Empty/EmptyWork.tsx',
        })
      }
    />
  )
}
