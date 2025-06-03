import { FormattedMessage } from 'react-intl'

import IconSave from '@/public/static/icons/24px/save.svg'
import { Empty, Icon } from '~/components'

export const EmptyTagBookmark = () => (
  <Empty
    icon={<Icon icon={IconSave} size={64} />}
    description={
      <>
        <FormattedMessage id="iIitRg" defaultMessage="Tag not bookmarked yet" />
      </>
    }
  />
)
