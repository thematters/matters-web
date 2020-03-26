import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog, Icon, Spinner, Translate } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

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
    skip: !process.browser,
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
    <>
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
                  zh_hant="請在新頁面完成綁定，不要關閉本窗口"
                  zh_hans="请在新页面完成绑定，不要关闭本窗口"
                />
              </p>
            </>
          )
        }
      />

      <Dialog.Footer>
        <Dialog.Footer.Button
          disabled={!error}
          onClick={() => {
            prevStep()
            analytics.trackEvent(ANALYTICS_EVENTS.LIKECOIN_STEP_RETRY)
          }}
        >
          <Translate id="retry" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Binding
