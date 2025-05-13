import { Protected } from '~/components'
import MeDraftDetailOptionsPage from '~/views/Me/DraftDetail/OptionsPage'

const ProtectedMeDraftDetailOptionsPage = () => (
  <Protected>
    <MeDraftDetailOptionsPage />
  </Protected>
)

export default ProtectedMeDraftDetailOptionsPage
