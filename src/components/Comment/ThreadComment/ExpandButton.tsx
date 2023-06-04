import { Button, IconArrowDown16, TextIcon, Translate } from '~/components'

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
      icon={<IconArrowDown16 size="xs" />}
    >
      <Translate
        zh_hant={`查看 ${restCount} 條回應`}
        zh_hans={`查看 ${restCount} 条回应`}
        en={`load the rest ${restCount} replies`}
      />
    </TextIcon>
  </Button>
)
export default ExpandButton
