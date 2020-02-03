import { Button, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

const CancelEditButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    size={[null, '2rem']}
    spacing={[0, 'base']}
    bgColor="grey-lighter"
    className="cancel-button"
    onClick={onClick}
  >
    <TextIcon color="grey" weight="md">
      <Translate zh_hant={TEXT.zh_hant.cancel} zh_hans={TEXT.zh_hans.cancel} />
    </TextIcon>
  </Button>
)

export default CancelEditButton
