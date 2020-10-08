import Maintainers from './Maintainers'
import Participants from './Participants'

interface Props {
  id: string

  isOwner: boolean
}

const Community = ({ id, isOwner }: Props) => {
  return (
    <>
      <Maintainers id={id} isOwner={isOwner} />
      <Participants id={id} />
    </>
  )
}

export default Community
