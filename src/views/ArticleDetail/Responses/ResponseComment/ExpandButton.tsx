import { Button, Icon, TextIcon, Translate } from '~/components'

import styles from './styles.css'

const ExpandButton = ({
  onClick,
  restCount
}: {
  onClick: () => any
  restCount: number
}) => (
  <Button
    size={[null, '1.5rem']}
    spacing={[0, 'base']}
    bgHoverColor="green-lighter"
    onClick={onClick}
  >
    <TextIcon
      icon={<Icon.Down size="xs" />}
      size="sm"
      color="green"
      textPlacement="left"
      spacing="xxtight"
    >
      <Translate
        zh_hant={`查看 ${restCount} 條回應`}
        zh_hans={`查看 ${restCount} 条回应`}
      />
    </TextIcon>

    <style jsx>{styles}</style>
  </Button>
)
export default ExpandButton
