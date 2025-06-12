import { useIntl } from 'react-intl'

import IconEmptyFile from '@/public/static/icons/empty-file.svg'
import { Empty, Icon, StartWriting } from '~/components'

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
      icon={<Icon icon={IconEmptyFile} size={88} />}
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
