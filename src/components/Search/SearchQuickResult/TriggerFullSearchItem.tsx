import IconRight from '@/public/static/icons/24px/right.svg'
import { toPath } from '~/common/utils'
import { Icon, Menu, TextIcon, Translate } from '~/components'

interface TriggerFullSearchItemProps {
  searchKey: string
}

const TriggerFullSearchItem = ({ searchKey }: TriggerFullSearchItemProps) => {
  return (
    <Menu.Item
      {...toPath({
        page: 'search',
        q: searchKey,
      })}
    >
      <TextIcon
        icon={<Icon icon={IconRight} color="green" />}
        color="green"
        weight="medium"
        placement="left"
      >
        <Translate
          zh_hant="查看所有作品、用戶、標籤檢索結果"
          zh_hans="查看所有作品、用戶、标签搜索結果"
          en="All article, author, tag search results"
        />
      </TextIcon>
    </Menu.Item>
  )
}

export default TriggerFullSearchItem
