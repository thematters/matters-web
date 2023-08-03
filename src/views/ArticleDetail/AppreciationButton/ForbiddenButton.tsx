import { toast, Translate } from '~/components'

import AppreciateButton from './AppreciateButton'

const ForbiddenButton = ({
  count,
  total,
}: {
  count?: number
  total: number
}) => (
  <AppreciateButton
    count={count}
    total={total}
    onClick={() => {
      toast.error({
        message: <Translate id="FORBIDDEN_BY_STATE" />,
      })
    }}
  />
)

export default ForbiddenButton
