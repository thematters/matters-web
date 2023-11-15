import { Protected } from '~/components'
import MeWorksPublished from '~/views/Me/Works/Published'

const ProtectedMeWorksPublished = () => (
  <Protected>
    <MeWorksPublished />
  </Protected>
)

export default ProtectedMeWorksPublished
