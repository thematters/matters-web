import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import {
  Button,
  IconArrowRight16,
  Media,
  TextIcon,
} from '~/components'

const ViewBlocksButton = () => {
  return (
    <Button
      htmlHref={PATHS.ME_SETTINGS_BLOCKED}
      size={[null, '1.25rem']}
      spacing={[0, 0]}
    >
      <TextIcon
        icon={<IconArrowRight16 size="xs" color="green" />}
        textPlacement="left"
      >
        <Media at="sm">
          <FormattedMessage defaultMessage="Manage Block" description="src/components/BlockUser/Dialog/ViewBlocksButton.tsx" />
        </Media>
        <Media greaterThan="sm">
          <FormattedMessage defaultMessage="View" description="src/components/BlockUser/Dialog/ViewBlocksButton.tsx" />
        </Media>
      </TextIcon>
    </Button>
  )
}

export default ViewBlocksButton
