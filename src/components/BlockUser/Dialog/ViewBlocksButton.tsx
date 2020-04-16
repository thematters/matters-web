import { Button, Icon, TextIcon, Translate, useResponsive } from '~/components'

import { PATHS } from '~/common/enums'

const ViewBlocksButton = () => {
  const isMediumUp = useResponsive('md-up')

  return (
    <Button
      href={PATHS.ME_SETTINGS_BLOCKED}
      size={[null, '1.25rem']}
      spacing={[0, 0]}
    >
      <TextIcon
        icon={<Icon.Right size="xs" color="green" />}
        textPlacement="left"
      >
        {isMediumUp ? (
          <Translate zh_hant="管理封鎖" zh_hans="管理屏蔽" />
        ) : (
          <Translate zh_hant="查看" zh_hans="查看" />
        )}
      </TextIcon>
    </Button>
  )
}

export default ViewBlocksButton
