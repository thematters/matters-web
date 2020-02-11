import gql from 'graphql-tag'
import { useEffect } from 'react'

import { Dialog, Spinner, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import styles from './styles.css'

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
        <section className="container">
          {!error && (
            <>
              <Spinner />
              <p>
                <Translate
                  zh_hant="正在生成 Liker ID"
                  zh_hans="正在生成 Liker ID"
                />
              </p>
            </>
          )}
          {error && (
            <p>
              <Translate
                zh_hant="哎呀，設置失敗了。"
                zh_hans="哎呀，设置失败了。"
              />
            </p>
          )}
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Button
          disabled={!error}
          onClick={() => {
            prevStep()
            analytics.trackEvent(ANALYTICS_EVENTS.LIKECOIN_STEP_RETRY)
          }}
        >
          <Translate
            zh_hant={TEXT.zh_hant[error ? 'retry' : 'continue']}
            zh_hans={TEXT.zh_hans[error ? 'retry' : 'continue']}
          />
        </Dialog.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </>
  )
}

export default Generating
