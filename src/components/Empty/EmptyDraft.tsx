import { useIntl } from 'react-intl'

import { ReactComponent as IconFile88 } from '@/public/static/icons/88px/file.svg'
import { Empty, StartWriting, withIcon } from '~/components'

export const EmptyDraft = () => {
  const intl = useIntl()

  return (
    <Empty
      spacingY="xxloose"
      icon={withIcon(IconFile88)({ size: 'xxxlM' })}
      description={intl.formatMessage({
        defaultMessage: 'No drafts yet',
        id: 'PmLGMc',
        description: 'src/components/Empty/EmptyDraft.tsx',
      })}
      footer={<StartWriting />}
    />
  )
}
