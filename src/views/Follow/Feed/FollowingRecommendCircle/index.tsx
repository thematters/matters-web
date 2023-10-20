import React, { useContext } from 'react'

import {
  OPEN_SUBSCRIBE_CIRCLE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  BindEmailHintDialog,
  Button,
  Card,
  CardProps,
  CircleAvatar,
  LinkWrapper,
  SubscribeCircleDialog,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import {
  FollowingFeedRecommendCirclePrivateFragment,
  FollowingFeedRecommendCirclePublicFragment,
} from '~/gql/graphql'

import Footer from './Footer'
import { fragments } from './gql'
import styles from './styles.module.css'

type Props = {
  circle: FollowingFeedRecommendCirclePublicFragment &
    FollowingFeedRecommendCirclePrivateFragment
} & CardProps

const RecommendCircle = ({ circle, ...cardProps }: Props) => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  const { displayName, description } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  const openSubscribeCircleDialog = () =>
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))

  return (
    <BindEmailHintDialog>
      {({ openDialog: openBindEmailHintDialog }) => {
        return (
          <Card
            bgActiveColor="none"
            borderRadius="xtight"
            spacing={['base', 'base']}
            {...path}
            {...cardProps}
          >
            <section className={styles.container}>
              <section className={styles.head}>
                <CircleAvatar circle={circle} size="xxl" />

                <section className={styles.wrap}>
                  <p className={styles.name}>
                    <LinkWrapper textActiveColor="green" {...path}>
                      {displayName}
                    </LinkWrapper>
                  </p>

                  <section className={styles.follow}>
                    <Button
                      spacing={['xtight', 'tight']}
                      textColor="green"
                      textActiveColor="white"
                      bgActiveColor="green"
                      borderColor="green"
                      onClick={() => {
                        if (!viewer.isAuthed) {
                          window.dispatchEvent(
                            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG)
                          )
                          return
                        }

                        if (!hasEmail) {
                          openBindEmailHintDialog()
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

              <section className={styles.content}>
                {description && (
                  <p className={styles.description}>{description}</p>
                )}

                <Footer circle={circle} />
              </section>

              <SubscribeCircleDialog circle={circle} />
            </section>
          </Card>
        )
      }}
    </BindEmailHintDialog>
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
