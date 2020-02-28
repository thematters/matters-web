import { Button, TextIcon, Translate } from '~/components'

const CancelEditButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    size={[null, '2rem']}
    spacing={[0, 'base']}
    bgColor="grey-lighter"
    className="cancel-button"
    onClick={onClick}
  >
    <TextIcon color="grey" weight="md">
      <Translate id="cancel" />
    </TextIcon>
  </Button>
)

export default CancelEditButton
