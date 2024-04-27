import { useIntl } from 'react-intl'

import { ReactComponent as IconEmptyFile } from '@/public/static/icons/empty-file.svg'
import { Empty, StartWriting, withIcon } from '~/components'

export const EmptyArticle = ({
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
      icon={withIcon(IconEmptyFile)({ size: 'xxxlM' })}
      description={
        description ||
        intl.formatMessage({
          defaultMessage: 'No published articles yet',
          id: 'yIlC0R',
          description: 'src/components/Empty/EmptyArticle.tsx',
        })
      }
      footer={isMe ? <StartWriting /> : undefined}
    />
  )
}
