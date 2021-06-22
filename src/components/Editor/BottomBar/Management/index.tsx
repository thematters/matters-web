import { Button, IconSettings24, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import { ToggleAccessProps } from '../../ToggleAccess'
import { ManagementDialog } from './Dialog'

type ManagementProps = ToggleAccessProps

const Management: React.FC<ManagementProps> = (props) => (
  <ManagementDialog {...props}>
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
  </ManagementDialog>
)

export default Management
