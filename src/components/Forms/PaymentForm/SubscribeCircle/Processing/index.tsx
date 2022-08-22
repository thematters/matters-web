import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { useState } from 'react'

import { Dialog, Spinner, Translate } from '~/components'

import { VIEWER_CIRLCE_STATE } from './gql'

import { ViewerCircleState } from './__generated__/ViewerCircleState'

interface Props {
  circleName: string
  nextStep: () => void
}

const Processing: React.FC<Props> = ({ circleName, nextStep }) => {
  const [polling, setPolling] = useState(true)
  const { data, error } = useQuery<ViewerCircleState>(VIEWER_CIRLCE_STATE, {
    variables: { name: circleName },
    pollInterval: polling ? 1000 : undefined,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser,
  })
  const isMember = data?.circle?.isMember

  if (isMember) {
    nextStep()
    return null
  }

  if (error) {
    setPolling(false)
  }

  return (
    <Dialog.Message type={error ? 'error' : undefined} spacing="md">
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
