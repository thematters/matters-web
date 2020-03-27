import AppreciateButton from './AppreciateButton'
import CivicLikerDialog from './CivicLikerDialog'

const CivicLikerButton = ({
  onClose,
  count,
  total,
}: {
  onClose: () => void
  count?: number
  total: number
}) => (
  <CivicLikerDialog onClose={onClose}>
    {({ open }) => (
      <AppreciateButton onClick={open} count={count} total={total} />
    )}
  </CivicLikerDialog>
)

export default CivicLikerButton
