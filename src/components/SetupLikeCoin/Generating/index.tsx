import { gql } from '@apollo/client'
import { useEffect } from 'react'

import { Dialog, Spinner, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

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
    generate().then((result) => {
      const likerId = result?.data?.generateLikerId.liker.likerId

      if (likerId) {
        nextStep()
        return null
      }
    })
  }, [])

  return (
    <>
      <Dialog.Message error={!!error} spacing="md">
        {error ? (
          <h3>
            <Translate
              zh_hant="哎呀，設置失敗了。"
              zh_hans="哎呀，设置失败了。"
            />
          </h3>
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
        )}
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button disabled={!error} onClick={prevStep}>
          <Translate id={error ? 'retry' : 'continue'} />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Generating
