import { FormattedMessage } from 'react-intl'

import IconNavSearch from '@/public/static/icons/24px/nav-search.svg'
import { Empty, Icon } from '~/components'

export const EmptySearch = ({
  description,
}: {
  description?: string | React.ReactNode
}) => (
  <Empty
    icon={<Icon icon={IconNavSearch} size={64} />}
    description={
      description || (
        <FormattedMessage defaultMessage="Result not found" id="iYk6P9" />
      )
    }
  />
)
