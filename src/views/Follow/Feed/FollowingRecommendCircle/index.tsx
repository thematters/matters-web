import Link from 'next/link'
import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_SUBSCRIBE_CIRCLE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Button,
  Card,
  CardProps,
  CircleAvatar,
  SetEmailDialog,
  SubscribeCircleDialog,
  TextIcon,
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
  const isEmailVerified = !!viewer.info.emailVerified

  const { displayName, description } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  const openSubscribeCircleDialog = () =>
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))

  return (
    <SetEmailDialog>
      {({ openDialog: openSetEmailDialog }) => {
        return (
          <Card
            bgActiveColor="none"
            borderRadius="xtight"
            spacing={[16, 16]}
            {...path}
            {...cardProps}
          >
            <section className={styles.container}>
              <section className={styles.head}>
                <CircleAvatar circle={circle} size={56} />

                <section className={styles.wrap}>
                  <p className={styles.name}>
                    <Link className="u-link-active-green" {...path}>
                      {displayName}
                    </Link>
                  </p>

                  <section className={styles.follow}>
                    <Button
                      spacing={[8, 12]}
                      textColor="green"
                      textActiveColor="white"
                      bgActiveColor="green"
                      borderColor="green"
                      onClick={() => {
                        if (!viewer.isAuthed) {
                          window.dispatchEvent(
                            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                              detail: {
                                trigger: UNIVERSAL_AUTH_TRIGGER.followCircle,
                              },
                            })
                          )
                          return
                        }

                        if (!hasEmail || !isEmailVerified) {
                          openSetEmailDialog()
                          return
                        }

                        openSubscribeCircleDialog()
                      }}
                    >
                      <TextIcon weight="medium" size={12}>
                        <FormattedMessage
                          defaultMessage="Subscribe"
                          id="gczcC5"
                        />
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
    </SetEmailDialog>
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
