import { Button } from '~/components'

import { PATHS } from '~/common/enums'

export default props => (
  <Button
    is="button"
    size="large"
    bgColor="transparent"
    spacing="default"
    className="u-link-green"
    {...props}
  >
    登入
  </Button>
)
