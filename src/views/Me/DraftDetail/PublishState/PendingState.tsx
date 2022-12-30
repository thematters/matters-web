import { useQuery } from '@apollo/react-hooks'

import { Toast, Translate } from '~/components'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'
import {
  DraftPublishStateQuery,
  PublishStateDraftFragment,
} from '~/gql/graphql'

const PendingState = ({ draft }: { draft: PublishStateDraftFragment }) => {
  useQuery<DraftPublishStateQuery>(DRAFT_PUBLISH_STATE, {
    variables: { id: draft.id },
    pollInterval: 1000 * 2,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: typeof window === 'undefined',
  })

  return (
    <Toast.Instance
      color="green"
      content={<Translate id="publishing" />}
      subDescription={
        <Translate
          zh_hant="上鏈後，作品不可刪除，去中心化保存"
          zh_hans="上链后，作品不可删除，去中心化保存"
          en="After publication, your work cannot be deleted."
        />
      }
    />
  )
}

export default PendingState
