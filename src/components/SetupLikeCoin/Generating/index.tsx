import gql from 'graphql-tag'
import { useEffect } from 'react'

import { Dialog, Icon, Spinner, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { GenerateLikerId } from './__generated__/GenerateLikerId'

interface Props {
  prevStep: () => void
  nextStep: () => void
}

const GENERATE_LIKER_ID = gql`
  mutation GenerateLikerId {
    generateLikerId {
      id
      liker {
        likerId
      }
      status {
        state
      }
    }
  }
`

const Generating: React.FC<Props> = ({ prevStep, nextStep }) => {
  const [generate, { error }] = useMutation<GenerateLikerId>(GENERATE_LIKER_ID)

  useEffect(() => {
    generate().then(result => {
      const likerId = result?.data?.generateLikerId.liker.likerId

      if (likerId) {
        nextStep()
        return null
      }
    })
  }, [])

  return (
    <>
      <Dialog.Content>
        <Dialog.Message
          description={
            error ? (
              <>
                <div>
                  <Icon.EmptyWarning color="grey-light" size="xl" />
                </div>

                <p>
                  <Translate
                    zh_hant="哎呀，設置失敗了。"
                    zh_hans="哎呀，设置失败了。"
                  />
                </p>
              </>
            ) : (
              <>
                <Spinner />

                <p>
                  <Translate
                    zh_hant="正在生成 Liker ID"
                    zh_hans="正在生成 Liker ID"
                  />
                </p>
              </>
            )
          }
        />
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          disabled={!error}
          onClick={() => {
            prevStep()
            analytics.trackEvent(ANALYTICS_EVENTS.LIKECOIN_STEP_RETRY)
          }}
        >
          <Translate id={error ? 'retry' : 'continue'} />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Generating
