import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, SpinnerBlock } from '~/components'
import { ViewerLikerIdQuery } from '~/gql/graphql'

interface Props {
  prevStep: () => void
  nextStep: () => void
  windowRef?: Window
}

const VIEWER_LIKER_ID = gql`
  query ViewerLikerId {
    viewer {
      id
      liker {
        likerId
      }
    }
  }
`

const Binding: React.FC<Props> = ({ prevStep, nextStep, windowRef }) => {
  const { data, error, startPolling, stopPolling } =
    useQuery<ViewerLikerIdQuery>(VIEWER_LIKER_ID, {
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    })
  const likerId = data?.viewer?.liker.likerId

  useEffect(() => {
    startPolling(1000)

    return () => {
      stopPolling()
    }
  }, [])

  useEffect(() => {
    if (likerId) {
      nextStep()

      if (windowRef) {
        windowRef.close()
      }

      return
    }

    if (error) {
      stopPolling()
    }
  })

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Liker ID" id="iEJeQH" />}
      />

      <Dialog.Content>
        <Dialog.Content.Message
          align="center"
          smUpAlign="center"
          type={error ? 'error' : undefined}
        >
          {error ? (
            <h3>
              <FormattedMessage
                defaultMessage="Oops! Setup failed."
                id="7Y9hwb"
              />
            </h3>
          ) : (
            <>
              <SpinnerBlock />

              <p>
                <FormattedMessage
                  defaultMessage="Processing... Don't leave the page."
                  id="mThL4h"
                />
              </p>
            </>
          )}
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<FormattedMessage defaultMessage="Retry" id="62nsdy" />}
            disabled={!error}
            onClick={prevStep}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Retry" id="62nsdy" />}
            disabled={!error}
            onClick={prevStep}
          />
        }
      />
    </>
  )
}

export default Binding
