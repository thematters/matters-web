import { Button, Icon, TextIcon, Translate } from '~/components'

export const ShuffleButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    size={[null, '1.25rem']}
    spacing={[0, 'xtight']}
    bgHoverColor="grey-lighter"
    onClick={onClick}
  >
    <TextIcon icon={<Icon.Reload size="sm" />} color="grey">
      <Translate zh_hant="換一批" zh_hans="换一批" />
    </TextIcon>
  </Button>
)
