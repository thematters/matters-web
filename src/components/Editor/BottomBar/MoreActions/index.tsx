import { Button, IconSettings24, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import { ToggleAccessProps } from '../../ToggleAccess'
import { MoreActionDialog } from './Dialog'

type MoreActionProps = ToggleAccessProps

const MoreAction: React.FC<MoreActionProps> = (props) => (
  <MoreActionDialog {...props}>
    {({ openDialog }) => (
      <Button
        aria-label={TEXT.zh_hant.articleManagement}
        aria-haspopup="true"
        onClick={openDialog}
      >
        <TextIcon
          icon={<IconSettings24 size="md" />}
          size="md-s"
          weight="md"
          spacing="xtight"
        >
          <Translate zh_hant="管理" zh_hans="管理" en="Manage" />
        </TextIcon>
      </Button>
    )}
  </MoreActionDialog>
)

export default MoreAction
