import { ReactComponent as IconDown } from '@/public/static/icons/24px/down.svg'
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
    spacing={[0, 'xtight']}
    bgActiveColor="greyLighter"
    onClick={onClick}
  >
    <TextIcon
      size="xs"
      color="green"
      textPlacement="left"
      icon={<Icon icon={IconDown} size="xs" />}
    >
      <Translate
        zh_hant={`查看 ${restCount} 條回應`}
        zh_hans={`查看 ${restCount} 条回应`}
        en={`Load the rest ${restCount} replies`}
      />
    </TextIcon>
  </Button>
)
export default ExpandButton
