import { ModalSwitch } from '~/components'

import AppreciateButton from './AppreciateButton'

const CivicLikerButton = ({
  onClick,
  count,
  total,
  inFixedToolbar
}: {
  onClick: () => void
  count?: number
  total: number
  inFixedToolbar?: boolean
}) => (
  <ModalSwitch modalId="civicLikerModal">
    {(open: any) => (
      <AppreciateButton
        onClick={() => {
          open()
          onClick()
        }}
        count={count}
        total={total}
        inFixedToolbar={inFixedToolbar}
      />
    )}
  </ModalSwitch>
)

export default CivicLikerButton
