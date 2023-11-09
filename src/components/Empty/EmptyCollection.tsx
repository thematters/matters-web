import { useIntl } from 'react-intl'

import { Empty, IconBook88 } from '~/components'

export const EmptyCollection = () => {
  const intl = useIntl()

  return (
    <Empty
      spacingY="xxloose"
      icon={<IconBook88 size="xxxlM" />}
      description={intl.formatMessage({
        defaultMessage: 'No collection created yet',
        id: 'GU6vV0',
        description: 'src/components/Empty/EmptyCollection.tsx',
      })}
    />
  )
}
