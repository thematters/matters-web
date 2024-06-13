import { Protected } from '~/components'
import JournalDetailEdit from '~/views/JournalDetail/Edit'

const ProtectedJournalDetailEdit = () => (
  <Protected>
    <JournalDetailEdit />
  </Protected>
)

export default ProtectedJournalDetailEdit
