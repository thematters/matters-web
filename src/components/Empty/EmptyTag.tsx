import { Empty, Icon, Translate } from '~/components'

export const EmptyTag = ({
  description
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<Icon.HashTag color="grey-lighter" size="xl" />}
    description={description || <Translate id="TAG_NOT_FOUND" />}
  />
)
