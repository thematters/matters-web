import { Button, Icon, Responsive } from '~/components'

import ICON_WRITE from '~/static/icons/write.svg?sprite'

export default () => (
  <Button
    size="large"
    bgColor="gold"
    icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
  >
    創作
  </Button>
)
