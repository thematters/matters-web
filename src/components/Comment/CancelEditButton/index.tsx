import { FormattedMessage } from 'react-intl'

import { Button, TextIcon } from '~/components'

const CancelEditButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    size={[null, '2rem']}
    spacing={[0, 'base']}
    bgColor="grey-lighter"
    onClick={onClick}
  >
    <TextIcon color="grey" weight="md">
      <FormattedMessage defaultMessage="Cancel" description="Cancel button"/>
    </TextIcon>
  </Button>
)

export default CancelEditButton
