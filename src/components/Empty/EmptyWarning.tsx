import { ReactComponent as IconWarn } from '@/public/static/icons/24px/warn.svg'
import { Empty, Icon } from '~/components'

export const EmptyWarning = ({
  description,
}: {
  description: React.ReactNode
}) => (
  <Empty icon={<Icon icon={IconWarn} size="xxl" />} description={description} />
)
