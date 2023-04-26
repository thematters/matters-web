import { ResponsiveWrapper } from '@/src/components'

import Maintainers from './Maintainers'
import Participants from './Participants'

interface Props {
  id: string

  isOwner: boolean
}

const Community = ({ id, isOwner }: Props) => {
  return (
    <ResponsiveWrapper>
      <Maintainers id={id} isOwner={isOwner} />
      <Participants id={id} />
    </ResponsiveWrapper>
  )
}

export default Community
