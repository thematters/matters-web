import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { Dialog, SpinnerBlock } from '~/components'
import { ViewerCircleStateQuery } from '~/gql/graphql'

import { VIEWER_CIRCLE_STATE } from './gql'

interface Props {
  circleName: string
  nextStep: () => void
}

const Processing: React.FC<Props> = ({ circleName, nextStep }) => {
  const { data, error, startPolling, stopPolling } =
    useQuery<ViewerCircleStateQuery>(VIEWER_CIRCLE_STATE, {
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
    <Dialog.Content>
      <Dialog.Content.Message
        align="center"
        smUpAlign="center"
        type={error ? 'error' : undefined}
      >
        {error ? (
          <h3>
            <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR]} />
          </h3>
        ) : (
          <SpinnerBlock />
        )}
      </Dialog.Content.Message>
    </Dialog.Content>
  )
}

export default Processing
