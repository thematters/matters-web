import { useContext } from 'react'

import {
  Card,
  IconArrowRight16,
  Layout,
  Translate,
  ViewerContext,
} from '~/components'

import { fragments } from './gql'
import IntroDialog from './IntroDialog'
import styles from './styles.css'

import { SubscriptionBannerCirclePrivate } from './__generated__/SubscriptionBannerCirclePrivate'
import { SubscriptionBannerCirclePublic } from './__generated__/SubscriptionBannerCirclePublic'

type SubscriptionBannerProps = {
  circle: SubscriptionBannerCirclePublic &
    Partial<SubscriptionBannerCirclePrivate>
}

const SubscriptionBanner = ({ circle }: SubscriptionBannerProps) => {
  const viewer = useContext(ViewerContext)
  const isMember = circle.isMember
  const isOwner = circle?.owner?.id === viewer.id
  const price = circle.prices && circle.prices[0]

  if (isMember || isOwner || !price) {
    return null
  }

  return (
    <section className="subscription-banner">
      <Layout.FixedMain>
        <IntroDialog circle={circle} onConfirm={() => alert('CONFIRM')}>
          {({ open: openIntroDialog }) => (
            <Card bgColor="none" spacing={[0, 0]} onClick={openIntroDialog}>
              <section className="content">
                <section className="inner">
                  <p>
                    {price.amount} {price.currency} / <Translate id="month" />
                    <Translate
                      zh_hant="，立即訂閱圍爐"
                      zh_hans="，立即订阅围炉"
                    />
                  </p>

                  <IconArrowRight16 color="white" />
                </section>
              </section>
            </Card>
          )}
        </IntroDialog>
      </Layout.FixedMain>

      <style jsx>{styles}</style>
    </section>
  )
}

SubscriptionBanner.fragments = fragments

export default SubscriptionBanner
