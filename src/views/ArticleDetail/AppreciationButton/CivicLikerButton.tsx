import AppreciateButton from './AppreciateButton'
import CivicLikerDialog from './CivicLikerDialog'

const CivicLikerButton = ({
  onClose,
  count,
  total,
  inFixedToolbar
}: {
  onClose: () => void
  count?: number
  total: number
  inFixedToolbar?: boolean
}) => (
  <CivicLikerDialog onClose={onClose}>
    {({ open }) => (
      <AppreciateButton
        onClick={open}
        count={count}
        total={total}
        inFixedToolbar={inFixedToolbar}
      />
    )}
  </CivicLikerDialog>
)

export default CivicLikerButton
