import gql from 'graphql-tag'
import { useEffect } from 'react'

import { useMutation } from '~/components/GQL'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { Spinner } from '~/components/Spinner'

import { TEXT } from '~/common/enums'

import { GenerateLikerId } from './__generated__/GenerateLikerId'
import styles from './styles.css'

interface Props {
  prevStep: () => void
  nextStep: () => void
  scrollLock?: boolean
}

const GENERATE_LIKER_ID = gql`
  mutation GenerateLikerId {
    generateLikerId {
      id
      likerId
      status {
        state
      }
    }
  }
`

const Generating: React.FC<Props> = ({ prevStep, nextStep, scrollLock }) => {
  const [generate, { error }] = useMutation<GenerateLikerId>(GENERATE_LIKER_ID)

  useEffect(() => {
    generate().then(result => {
      const likerId =
        result && result.data && result.data.generateLikerId.likerId

      if (likerId) {
        nextStep()
        return null
      }
    })
  }, [])

  return (
    <>
      <Modal.Content scrollLock={scrollLock}>
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
      </Modal.Content>

      <footer>
        <Modal.FooterButton onClick={prevStep} width="full" disabled={!error}>
          <Translate
            zh_hant={TEXT.zh_hant[error ? 'retry' : 'continue']}
            zh_hans={TEXT.zh_hans[error ? 'retry' : 'continue']}
          />
        </Modal.FooterButton>
      </footer>

      <style jsx>{styles}</style>
    </>
  )
}

export default Generating
