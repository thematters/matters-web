import { CivicLikerAppreciateButtonUserFragment } from '~/gql/graphql'

import AppreciateButton from './AppreciateButton'
import CivicLikerDialog from './CivicLikerDialog'

const CivicLikerButton = ({
  user,
  onClose,
  count,
  total,
}: {
  user: CivicLikerAppreciateButtonUserFragment
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
