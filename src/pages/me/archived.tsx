import { Protected } from '~/components'
import MeWorksArchived from '~/views/Me/Works/Archived'

const ProtectedMeWorksArchived = () => (
  <Protected>
    <MeWorksArchived />
  </Protected>
)

export default ProtectedMeWorksArchived
