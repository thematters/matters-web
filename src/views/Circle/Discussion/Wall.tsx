import { useContext } from 'react'

import {
  LoginButton,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, OPEN_SUBSCRIBE_CIRCLE_DIALOG } from '~/common/enums'

import CIRCLE_DISCUSSION_WALL_SM from '@/public/static/images/circle-discussion-wall-sm.svg'
import CIRCLE_DISCUSSION_WALL from '@/public/static/images/circle-discussion-wall.svg'

import IntroDialog from '../Detail/SubscriptionBanner/IntroDialog'
import styles from './styles.css'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

type WallProps = {
  circle: DigestRichCirclePublic
}

const Wall = ({ circle }: WallProps) => {
  const isSmallUp = useResponsive('sm-up')
  const viewer = useContext(ViewerContext)

  const showLoginToast = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="請登入／註冊訂閱圍爐"
              zh_hans="请登入／注册订阅围炉"
            />
          ),
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  const openSubscribeCircleDialog = () =>
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))

  return (
    <IntroDialog circle={circle} onConfirm={openSubscribeCircleDialog}>
      {({ open: openIntroDialog }) => (
        <section
          className="wall"
          aria-label="成為圍爐一員，一起談天說地"
          role="button"
          onClick={() => {
            if (!viewer.isAuthed) {
              showLoginToast()
              return
            }

            openIntroDialog()
          }}
        >
          <img
            src={isSmallUp ? CIRCLE_DISCUSSION_WALL : CIRCLE_DISCUSSION_WALL_SM}
          />

          <section className="brief">
            {/* <p>
        <Translate zh_hant="聽說目前共累積 67 串討論，138 則迴響" />
      </p> */}
          </section>

          <style jsx>{styles}</style>
        </section>
      )}
    </IntroDialog>
  )
}

export default Wall
