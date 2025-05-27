import IconDown from '@/public/static/icons/24px/down.svg'
import { Button, Icon, TextIcon, Translate } from '~/components'

const ExpandButton = ({
  onClick,
  restCount,
}: {
  onClick: () => any
  restCount: number
}) => (
  <Button
    size={[null, '1.25rem']}
    spacing={[0, 8]}
    bgActiveColor="greyLighter"
    onClick={onClick}
  >
    <TextIcon
      size={12}
      color="green"
      placement="left"
      icon={<Icon icon={IconDown} size={12} />}
    >
      <Translate
        zh_hant={`查看 ${restCount} 條評論`}
        zh_hans={`查看 ${restCount} 条评论`}
        en={`Load the rest ${restCount} replies`}
      />
    </TextIcon>
  </Button>
)
export default ExpandButton
