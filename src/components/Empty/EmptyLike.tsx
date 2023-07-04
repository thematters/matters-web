import { ReactComponent as IconLike88 } from '@/public/static/icons/88px/like.svg'
import { Empty, Translate, withIcon } from '~/components'

export const EmptyLike = () => (
  <Empty
    icon={withIcon(IconLike88)({ size: 'xxxlM' })}
    description={
      <Translate
        zh_hant="尚無讚賞紀錄"
        zh_hans="尚无赞赏记录"
        en="No data yet"
      />
    }
  />
)
