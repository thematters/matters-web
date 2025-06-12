import { useIntl } from 'react-intl'

import IconEmptyFile from '@/public/static/icons/empty-file.svg'
import { Empty, Icon, StartWriting } from '~/components'

export const EmptyDraft = () => {
  const intl = useIntl()

  return (
    <Empty
      spacingY="xxloose"
      icon={<Icon icon={IconEmptyFile} size={88} />}
      description={intl.formatMessage({
        defaultMessage: 'No drafts yet',
        id: 'PmLGMc',
        description: 'src/components/Empty/EmptyDraft.tsx',
      })}
      footer={<StartWriting />}
    />
  )
}
