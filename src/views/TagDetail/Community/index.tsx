import { Layout } from '~/components'

import Maintainers from './Maintainers'
import Participants from './Participants'

interface Props {
  id: string

  isOwner: boolean
}

const Community = ({ id, isOwner }: Props) => {
  return (
    <Layout.Main.Spacing>
      <Maintainers id={id} isOwner={isOwner} />
      <Participants id={id} />
    </Layout.Main.Spacing>
  )
}

export default Community
