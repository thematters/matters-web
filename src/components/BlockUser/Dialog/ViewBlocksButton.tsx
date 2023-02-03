import { PATHS } from '~/common/enums'
import {
  Button,
  IconArrowRight16,
  Media,
  TextIcon,
  Translate,
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
          <Translate zh_hant="管理封鎖" zh_hans="管理屏蔽" />
        </Media>
        <Media greaterThan="sm">
          <Translate zh_hant="查看" zh_hans="查看" />
        </Media>
      </TextIcon>
    </Button>
  )
}

export default ViewBlocksButton
