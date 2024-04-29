import { useIntl } from 'react-intl'

import { ReactComponent as IconEmptyFile } from '@/public/static/icons/empty-file.svg'
import { Empty, StartWriting, withIcon } from '~/components'

export const EmptyDraft = () => {
  const intl = useIntl()

  return (
    <Empty
      spacingY="xxloose"
      icon={withIcon(IconEmptyFile)({ size: 'xxxlM' })}
      description={intl.formatMessage({
        defaultMessage: 'No drafts yet',
        id: 'PmLGMc',
        description: 'src/components/Empty/EmptyDraft.tsx',
      })}
      footer={<StartWriting />}
    />
  )
}
