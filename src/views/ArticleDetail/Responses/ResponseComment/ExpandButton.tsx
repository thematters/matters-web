import { Icon, TextIcon, Translate } from '~/components'

import styles from './styles.css'

const ExpandButton = ({
  onClick,
  restCount
}: {
  onClick: () => any
  restCount: number
}) => (
  <button className="expand-button" type="button" onClick={onClick}>
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
  </button>
)
export default ExpandButton
