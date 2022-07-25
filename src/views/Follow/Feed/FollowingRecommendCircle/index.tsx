import React, { useContext } from 'react'

import {
  Button,
  Card,
  CardProps,
  CircleAvatar,
  LinkWrapper,
  LoginButton,
  SubscribeCircleDialog,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, OPEN_SUBSCRIBE_CIRCLE_DIALOG } from '~/common/enums'
import { toPath } from '~/common/utils'

import Footer from './Footer'
import { fragments } from './gql'
import styles from './styles.css'

import { FollowingFeedRecommendCirclePrivate } from './__generated__/FollowingFeedRecommendCirclePrivate'
import { FollowingFeedRecommendCirclePublic } from './__generated__/FollowingFeedRecommendCirclePublic'

type Props = {
  circle: FollowingFeedRecommendCirclePublic &
  FollowingFeedRecommendCirclePrivate
} & CardProps

const RecommendCircle = ({ circle, ...cardProps }: Props) => {
  const viewer = useContext(ViewerContext)

  const { displayName, description } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

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
    <Card
      bgActiveColor="none"
      borderRadius="xtight"
      spacing={['base', 'base']}
      {...path}
      {...cardProps}
    >
      <section className="container">
        <section className="head">
          <CircleAvatar circle={circle} size="xxl" />

          <section className="wrap">
            <p className="name">
              <LinkWrapper textActiveColor="green" {...path}>
                {displayName}
              </LinkWrapper>
            </p>

            <section className="follow">
              <Button
                spacing={['xtight', 'tight']}
                textColor="green"
                textActiveColor="white"
                bgActiveColor="green"
                borderColor="green"
                onClick={() => {
                  if (!viewer.isAuthed) {
                    showLoginToast()
                    return
                  }

                  openSubscribeCircleDialog()
                }}
              >
                <TextIcon weight="md" size="xs">
                  <Translate id="subscriptions" />
                </TextIcon>
              </Button>
            </section>
          </section>
        </section>

        <section className="content">
          {description && <p className="description">{description}</p>}

          <Footer circle={circle} />
        </section>

        <SubscribeCircleDialog circle={circle} />

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

type MemoizedRecommendCircleType = React.MemoExoticComponent<
  React.FC<Props>
> & {
  fragments: typeof fragments
}

const MemoizedRecommendCircle = React.memo(
  RecommendCircle,
  ({ circle: prevCircle }, { circle }) => {
    return (
      prevCircle.id === circle.id && prevCircle.isMember === circle.isMember
    )
  }
) as MemoizedRecommendCircleType

MemoizedRecommendCircle.fragments = fragments

export default MemoizedRecommendCircle
