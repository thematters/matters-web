import classNames from 'classnames'
import React, { useContext } from 'react'

import {
  Avatar,
  Button,
  Expandable,
  Form,
  LoginButton,
  SubscribeCircleDialog,
  TextIcon,
  Translate,
  useFeatures,
  useResponsive,
  ViewerContext,
} from '~/components'
import Counts from '~/components/CircleDigest/Counts'

import { ADD_TOAST, OPEN_SUBSCRIBE_CIRCLE_DIALOG, PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { UserProfileUserPrivate_user_ownCircles } from '../__generated__/UserProfileUserPrivate'
import { UserProfileUserPublic_user_ownCircles } from '../__generated__/UserProfileUserPublic'

type CircleWidgetCircle = UserProfileUserPublic_user_ownCircles &
  Partial<UserProfileUserPrivate_user_ownCircles>

type CircleWidgetProps = {
  circles: CircleWidgetCircle[]
  isMe: boolean
}

const Subscribe = ({
  size,
  textSize,

  onClickSubscribe,
}: {
  size: ['100%', '3rem'] | ['100%', '2rem']
  textSize: 'sm' | 'md'

  onClickSubscribe: () => void
}) => {
  return (
    <section className="button">
      <Button bgColor="green" size={size} onClick={onClickSubscribe}>
        <TextIcon color="white" size={textSize} weight="md">
          <Translate zh_hant="立即加入" zh_hans="立即加入" en="Join Now" />
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </section>
  )
}

const CircleWidget = ({ circles, isMe }: CircleWidgetProps) => {
  const viewer = useContext(ViewerContext)
  const features = useFeatures()
  const isLargeUp = useResponsive('lg-up')

  const hasCircle = circles && circles.length > 0

  if (!isMe && !hasCircle) {
    return null
  }

  if (isMe && !hasCircle) {
    if (!features.circle_management) {
      return null
    }

    return (
      <section className="circle-widget">
        <Form.List forceGreyStyle>
          <Form.List.Item
            forceGreyStyle
            bold
            title={
              <Translate
                zh_hant="快來搭建圍爐，呼召你的支持者加入"
                zh_hans="快来搭建围炉，呼召你的支持者加入"
              />
            }
            href={PATHS.CIRCLE_CREATION}
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'create_circle' })
            }}
          />
        </Form.List>

        <style jsx>{styles}</style>
      </section>
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

  const openSubscribeCircleDialog = () => {
    if (!viewer.isAuthed) {
      showLoginToast()
      return
    }
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))
  }

  const circle = circles[0]
  const members = circle.latestMembers.edges || []
  const membersCount = (circle.latestMembers.totalCount || 0) + 1

  const widgetClasses = classNames({
    'circle-widget': true,
    border: true,
  })

  const membersContainerClasses = classNames({
    'members-container': true,
    'size-lg': isLargeUp,
  })

  return (
    <section className={widgetClasses}>
      <section className="container">
        <h3 className="title">
          <Translate
            zh_hant="我的圍爐計畫"
            zh_hans="我的围炉计画"
            en="My Circle"
          />
        </h3>

        <Counts circle={circle} />

        {circle.description && (
          <Expandable>
            <p className="description">{circle.description}</p>
          </Expandable>
        )}

        <section className={membersContainerClasses}>
          <section className="members">
            <section className="member-list">
              {members.map(({ node }, index) => (
                <Avatar user={node.user || undefined} size="md" key={index} />
              ))}
            </section>
            <p className="member-desc">
              <Translate
                zh_hant={`${membersCount} 人在眾聊室熱議中，快來加入對話吧！`}
                zh_hans={`${membersCount} 人在众聊室热议中，快来加入对话吧！`}
                en={`${membersCount} supporters in discussion. Join them!`}
              />
            </p>
          </section>

          {isLargeUp && (
            <Subscribe
              size={['100%', '2rem']}
              textSize="sm"
              onClickSubscribe={openSubscribeCircleDialog}
            />
          )}
        </section>

        {!isLargeUp && (
          <Subscribe
            size={['100%', '3rem']}
            textSize="md"
            onClickSubscribe={openSubscribeCircleDialog}
          />
        )}
      </section>

      {!isMe && <SubscribeCircleDialog circle={circle} />}

      <style jsx>{styles}</style>
    </section>
  )
}

CircleWidget.fragments = fragments

export default CircleWidget
