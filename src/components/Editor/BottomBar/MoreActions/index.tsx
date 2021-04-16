import { Button, IconCircle24, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import { ToggleAccessProps } from '../../ToggleAccess'
import { MoreActionDialog } from './Dialog'

type MoreActionProps = ToggleAccessProps

const MoreAction: React.FC<MoreActionProps> = (props) => (
  <MoreActionDialog {...props}>
    {({ open }) => (
      <Button
        aria-label={TEXT.zh_hant.articleManagement}
        aria-haspopup="true"
        onClick={open}
      >
        <TextIcon
          icon={<IconCircle24 size="md" />}
          size="md-s"
          weight="md"
          spacing="xtight"
        >
          <Translate zh_hant="圍爐" zh_hans="围炉" en="Circle" />
        </TextIcon>
      </Button>
    )}
  </MoreActionDialog>
)

export default MoreAction
