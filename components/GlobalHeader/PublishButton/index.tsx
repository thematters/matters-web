import { Button, Icon, Translate } from '~/components'

import ICON_WRITE from '~/static/icons/write.svg?sprite'

export default () => (
  <Button
    size="large"
    bgColor="green"
    icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
  >
    <Translate zh_hant="發佈" zh_hans="发布" />
  </Button>
)
