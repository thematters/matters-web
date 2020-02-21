import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog, Form, Spinner, Translate } from '~/components'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import styles from './styles.css'

import { ViewerLikerId } from './__generated__/ViewerLikerId'

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
  const [polling, setPolling] = useState(true)
  const { data, error } = useQuery<ViewerLikerId>(VIEWER_LIKER_ID, {
    pollInterval: polling ? 1000 : undefined,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser
  })
  const likerId = data?.viewer?.liker.likerId

  if (likerId) {
    nextStep()

    if (windowRef) {
      setTimeout(() => {
        windowRef.close()
      }, 5000)
    }

    return null
  }

  if (error) {
    setPolling(false)
  }

  return (
    <Form>
      <Dialog.Content>
        <section className="container">
          {!error && (
            <>
              <Spinner />
              <p>
                <Translate
                  zh_hant="請在新頁面完成綁定，不要關閉本窗口"
                  zh_hans="请在新页面完成绑定，不要关闭本窗口"
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
        <Dialog.Footer.Button
          disabled={!error}
          onClick={() => {
            prevStep()
            analytics.trackEvent(ANALYTICS_EVENTS.LIKECOIN_STEP_RETRY)
          }}
        >
          <Translate
            zh_hant={TEXT.zh_hant.retry}
            zh_hans={TEXT.zh_hans.retry}
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </Form>
  )
}

export default Binding
