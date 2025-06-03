import { useIntl } from 'react-intl'

import IconEmptyBook from '@/public/static/icons/empty-book.svg'
import { Empty, Icon } from '~/components'

export const EmptyCollection = () => {
  const intl = useIntl()

  return (
    <Empty
      spacingY="xxloose"
      icon={<Icon icon={IconEmptyBook} size={88} />}
      description={intl.formatMessage({
        defaultMessage: 'No collection created yet',
        id: 'GU6vV0',
        description: 'src/components/Empty/EmptyCollection.tsx',
      })}
    />
  )
}
