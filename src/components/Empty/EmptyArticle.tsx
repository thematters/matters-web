import { useIntl } from 'react-intl'

import { ReactComponent as IconFile88 } from '@/public/static/icons/88px/file.svg'
import { Empty, withIcon } from '~/components'

export const EmptyArticle = ({
  description,
}: {
  description?: React.ReactNode
}) => {
  const intl = useIntl()

  return (
    <Empty
      spacingY="xxloose"
      icon={withIcon(IconFile88)({ size: 'xxxlM' })}
      description={
        description ||
        intl.formatMessage({
          defaultMessage: 'No published articles yet',
          description: 'src/components/Empty/EmptyArticle.tsx',
        })
      }
    />
  )
}
