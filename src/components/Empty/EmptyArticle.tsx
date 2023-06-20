import { useIntl } from 'react-intl'

import { Empty, IconFile88 } from '~/components'

export const EmptyArticle = () => {
  const intl = useIntl()

  return (
    <Empty
      spacingY="xxloose"
      icon={<IconFile88 size="xxxlM" />}
      description={intl.formatMessage({
        defaultMessage: 'No published articles yet',
        description: 'src/components/Empty/EmptyArticle.tsx',
      })}
    />
  )
}
