import { Protected } from '~/components'
import PersonhoodFeasibility from '~/views/Me/Settings/Personhood/Feasibility'

const ProtectedPersonhoodFeasibility = () => (
  <Protected>
    <PersonhoodFeasibility />
  </Protected>
)

export default ProtectedPersonhoodFeasibility
