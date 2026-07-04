import { Protected } from '~/components'
import PersonhoodProve from '~/views/Me/Settings/Personhood/Prove'

const ProtectedPersonhoodProve = () => (
  <Protected>
    <PersonhoodProve />
  </Protected>
)

export default ProtectedPersonhoodProve
