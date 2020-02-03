import { Empty, Icon, Translate } from '~/components'

const EmptyComment = ({ description }: { description?: React.ReactNode }) => (
  <Empty
    icon={<Icon.Comment color="grey-lighter" size="xxl" />}
    description={
      description || <Translate zh_hant="還沒有評論" zh_hans="还没有评论" />
    }
  />
)

export default EmptyComment
