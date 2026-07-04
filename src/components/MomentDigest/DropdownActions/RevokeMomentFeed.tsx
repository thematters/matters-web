import gql from 'graphql-tag'

import IconCircleMinus from '@/public/static/icons/24px/circle-minus.svg'
import { Icon, Menu, toast, useMutation } from '~/components'
import { RevokeMomentFeedMutation } from '~/gql/graphql'

const REVOKE_MOMENT_FEED = gql`
  mutation RevokeMomentFeed($id: ID!) {
    updateMomentFeedApplicationState(input: { id: $id, state: revoked }) {
      id
      isMomentFeedApplied
    }
  }
`

const RevokeMomentFeed = ({ userId }: { userId: string }) => {
  const [revoke] = useMutation<RevokeMomentFeedMutation>(REVOKE_MOMENT_FEED, {
    variables: { id: userId },
  })

  return (
    <Menu.Item
      text="撤銷資格"
      icon={<Icon icon={IconCircleMinus} size={20} />}
      onClick={async () => {
        try {
          await revoke()
          toast.success({ message: '已撤銷資格' })
        } catch {}
      }}
    />
  )
}

export default RevokeMomentFeed
