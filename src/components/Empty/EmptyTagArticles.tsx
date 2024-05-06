import { ReactComponent as IconWarn } from '@/public/static/icons/24px/warn.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyTagArticles = () => (
  <Empty
    icon={<Icon icon={IconWarn} size={64} />}
    description={
      <Translate zh_hant="還沒有作品" zh_hans="還沒有作品" en="No Articles" />
    }
  />
)
