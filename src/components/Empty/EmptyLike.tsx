import IconEmptyLike from '@/public/static/icons/empty-like.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyLike = () => (
  <Empty
    icon={<Icon icon={IconEmptyLike} size={88} />}
    description={
      <Translate
        zh_hant="尚無讚賞紀錄"
        zh_hans="尚无赞赏记录"
        en="No data yet"
      />
    }
  />
)
