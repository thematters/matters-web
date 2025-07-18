import { DraftDetailStateProvider, Protected } from '~/components'
import MeDraftDetailOptionsPage from '~/views/Me/DraftDetail/OptionsPage'

const ProtectedMeDraftDetailOptionsPage = () => (
  <Protected>
    <DraftDetailStateProvider>
      <MeDraftDetailOptionsPage />
    </DraftDetailStateProvider>
  </Protected>
)

export default ProtectedMeDraftDetailOptionsPage
