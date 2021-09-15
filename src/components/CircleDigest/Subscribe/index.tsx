import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  LoginButton,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, OPEN_SUBSCRIBE_CIRCLE_DIALOG } from '~/common/enums'
import { toPath } from '~/common/utils'

import { SubscribeButtonCirclePrivate } from './__generated__/SubscribeButtonCirclePrivate'
import { SubscribeButtonCirclePublic } from './__generated__/SubscribeButtonCirclePublic'

type SubscribeProps = {
  circle: SubscribeButtonCirclePublic & Partial<SubscribeButtonCirclePrivate>

  onClick?: () => void
}

const fragments = {
  circle: {
    public: gql`
      fragment SubscribeButtonCirclePublic on Circle {
        id
        owner {
          userName
        }
      }
    `,
    private: gql`
      fragment SubscribeButtonCirclePrivate on Circle {
        id
        isMember
        invitedBy {
          id
          state
          freePeriod
        }
      }
    `,
  },
}

const Subscribe = ({ circle, onClick }: SubscribeProps) => {
  const viewer = useContext(ViewerContext)
  const isMember = circle.isMember
  const path = toPath({
    page: 'userProfile',
    userName: circle.owner.userName || '',
  })

  if (isMember) {
    return (
      <Button
        size={[null, '2rem']}
        spacing={[0, 'base']}
        bgColor="green"
        {...path}
      >
        <TextIcon weight="md" size="sm" color="white">
          <Translate zh_hant="回到主頁" zh_hans="回到主页" />
        </TextIcon>
      </Button>
    )
  }

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
    <Button
      size={[null, '2rem']}
      spacing={[0, 'base']}
      bgColor="green"
      onClick={() => {
        if (!viewer.isAuthed) {
          showLoginToast()
          return
        }

        openSubscribeCircleDialog()

        if (onClick) {
          onClick()
        }
      }}
    >
      <TextIcon weight="md" size="sm" color="white">
        <Translate zh_hant="訂閱圍爐" zh_hans="订阅围炉" en="Subscribe" />
      </TextIcon>
    </Button>
  )
}

Subscribe.fragments = fragments

export default Subscribe
