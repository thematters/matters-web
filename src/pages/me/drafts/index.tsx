import { Protected } from '~/components'
import MeWorksDrafts from '~/views/Me/Works/Drafts'

const ProtectedMeWorksDrafts = () => (
  <Protected>
    <MeWorksDrafts />
  </Protected>
)

export default ProtectedMeWorksDrafts
