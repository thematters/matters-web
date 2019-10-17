import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

import { Translate } from '~/components'

import { TEXT } from '~/common/enums'

const RECALL_PUBLISH = gql`
  mutation RecallPublish($id: ID!) {
    recallPublish(input: { id: $id }) {
      id
      scheduledAt
      publishState
    }
  }
`

const RecallButton = ({ id, text }: { id: string; text?: React.ReactNode }) => {
  const [recall] = useMutation(RECALL_PUBLISH, {
    variables: { id },
    optimisticResponse: {
      recallPublish: {
        id,
        scheduledAt: null,
        publishState: 'unpublished',
        __typename: 'Draft'
      }
    }
  })

  return (
    <button type="button" onClick={() => recall()}>
      {text || (
        <Translate
          zh_hant={TEXT.zh_hant.cancel}
          zh_hans={TEXT.zh_hans.cancel}
        />
      )}
    </button>
  )
}

export default RecallButton
