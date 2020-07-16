import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'

import { Dialog, Spinner, Translate } from '~/components'

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

  useEffect(() => {
    if (likerId) {
      nextStep()

      if (windowRef) {
        windowRef.close()
      }

      return
    }

    if (error) {
      setPolling(false)
    }
  })

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
                zh_hant="請在新頁面完成綁定，不要關閉本窗口"
                zh_hans="请在新页面完成绑定，不要关闭本窗口"
              />
            </p>
          </>
        )}
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button disabled={!error} onClick={prevStep}>
          <Translate id="retry" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Binding
