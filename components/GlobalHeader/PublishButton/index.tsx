import { Button, Icon } from '~/components'

import ICON_WRITE from '~/static/icons/write.svg?sprite'

export default () => (
  <Button
    size="large"
    bgColor="green"
    icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
  >
    發佈
  </Button>
)
