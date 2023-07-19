import { ReactComponent as IconComment88 } from '@/public/static/icons/88px/comment.svg'
import { Empty, Translate, withIcon } from '~/components'

export const EmptyComment = ({
  description,
}: {
  description?: React.ReactNode
}) => (
  <Empty
    icon={withIcon(IconComment88)({ size: 'xxxlM' })}
    description={
      description || (
        <Translate
          zh_hant="尚未發表評論"
          zh_hans="尚未发表评论"
          en="No data yet"
        />
      )
    }
  />
)
