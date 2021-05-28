import AppreciateButton from './AppreciateButton'
import CivicLikerDialog from './CivicLikerDialog'

import { CivicLikerAppreciateButtonUser } from './__generated__/CivicLikerAppreciateButtonUser'

const CivicLikerButton = ({
  user,
  onClose,
  count,
  total,
}: {
  user: CivicLikerAppreciateButtonUser
  onClose: () => void
  count?: number
  total: number
}) => (
  <CivicLikerDialog user={user} onClose={onClose}>
    {({ openDialog }) => (
      <AppreciateButton onClick={openDialog} count={count} total={total} />
    )}
  </CivicLikerDialog>
)

export default CivicLikerButton
