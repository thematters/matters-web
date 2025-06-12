import IconEmptyFile from '@/public/static/icons/empty-file.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyTagArticles = () => (
  <Empty
    icon={<Icon icon={IconEmptyFile} size={88} />}
    description={
      <Translate zh_hant="還沒有作品" zh_hans="還沒有作品" en="No Articles" />
    }
  />
)
