import { Button, Icon, TextIcon, Translate } from '~/components'

const TranslationButton = () => (
  <Button>
    <TextIcon
      icon={<Icon.World color="green" />}
      size="xs"
      spacing="xxtight"
      color="green"
    >
      <Translate id="translate" />
    </TextIcon>
  </Button>
)

export default TranslationButton
