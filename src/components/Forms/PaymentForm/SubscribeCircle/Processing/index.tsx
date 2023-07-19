import { useQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'

import { Dialog, Spinner, Translate } from '~/components'
import { ViewerCircleStateQuery } from '~/gql/graphql'

import { VIEWER_CIRLCE_STATE } from './gql'

interface Props {
  circleName: string
  nextStep: () => void
}

const Processing: React.FC<Props> = ({ circleName, nextStep }) => {
  const { data, error, startPolling, stopPolling } =
    useQuery<ViewerCircleStateQuery>(VIEWER_CIRLCE_STATE, {
      variables: { name: circleName },
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    })
  const isMember = data?.circle?.isMember

  useEffect(() => {
    if (error) {
      stopPolling()
    } else {
      startPolling(1000)
    }

    return () => {}
  }, [error])

  useEffect(() => {
    if (isMember) {
      nextStep()
    }
  }, [isMember])

  return (
    <Dialog.Message
      align="center"
      smUpAlign="center"
      type={error ? 'error' : undefined}
    >
      {error ? (
        <h3>
          <Translate id="NETWORK_ERROR" />
        </h3>
      ) : (
        <Spinner />
      )}
    </Dialog.Message>
  )
}

export default Processing
