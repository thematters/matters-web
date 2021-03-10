import { Button, IconMore32 } from '~/components'

import { TEXT } from '~/common/enums'

import { ToggleCircleProps } from '../../ToggleCircle'
import { MoreActionDialog } from './Dialog'

type MoreActionProps = ToggleCircleProps

const MoreAction: React.FC<MoreActionProps> = (props) => (
  <MoreActionDialog {...props}>
    {({ open }) => (
      <Button
        aria-label={TEXT.zh_hant.articleManagement}
        aria-haspopup="true"
        onClick={open}
      >
        <IconMore32 size="lg" color="black" />
      </Button>
    )}
  </MoreActionDialog>
)

export default MoreAction
