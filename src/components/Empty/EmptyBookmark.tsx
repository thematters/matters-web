import IconSave from '@/public/static/icons/24px/save.svg'
import { Empty, Icon, Translate } from '~/components'

export const EmptyBookmark = () => (
  <Empty
    icon={<Icon icon={IconSave} size={64} />}
    description={
      <>
        <Translate
          zh_hant="看到好作品"
          zh_hans="看到好作品"
          en="bookmark articles you like"
        />
        <br />
        <Translate
          zh_hant="可以點右下角收藏哦"
          zh_hans="可以点右下角收藏哦"
          en="by clicking the bottom right corner"
        />
      </>
    }
  />
)
