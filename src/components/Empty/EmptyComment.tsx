import { Empty, IconComment16, Translate } from '~/components'

export const EmptyComment = ({
  description,
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={<IconComment16 size="xxl" />}
    description={
      description || (
        <Translate
          zh_hant="還沒有評論"
          zh_hans="还没有评论"
          en="No comments."
        />
      )
    }
  />
)
