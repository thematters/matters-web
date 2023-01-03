import { toPath } from '~/common/utils'
import { IconArrowRight16, Menu, TextIcon, Translate } from '~/components'

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
        icon={<IconArrowRight16 color="green" />}
        color="green"
        weight="md"
        textPlacement="left"
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
