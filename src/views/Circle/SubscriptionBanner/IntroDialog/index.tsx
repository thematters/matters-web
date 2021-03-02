import { Dialog, Translate, useDialogSwitch, withIcon } from '~/components'

import { ReactComponent as IconCircleFeatureConnection } from '@/public/static/icons/circle-feature-connection.svg'
import { ReactComponent as IconCircleFeatureDiscussion } from '@/public/static/icons/circle-feature-discussion.svg'
import { ReactComponent as IconCircleFeatureReading } from '@/public/static/icons/circle-feature-reading.svg'

import styles from './styles.css'

import { SubscriptionBannerCirclePublic } from '../__generated__/SubscriptionBannerCirclePublic'

interface IntroDialogDialogProps {
  circle: SubscriptionBannerCirclePublic
  onConfirm: () => any
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const IntroDialogDialog = ({
  circle,
  onConfirm,
  children,
}: IntroDialogDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  const price = circle.prices && circle.prices[0]

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <Dialog.Header title="subscribeCircle" close={close} mode="inner" />

        <Dialog.Content spacing={['base', 'base']}>
          <section className="content">
            <header>
              {price && (
                <h3>
                  {price.amount} {price.currency} / <Translate id="month" />
                </h3>
              )}
              <p>
                <Translate
                  zh_hant="訂閱圍爐，立即享有"
                  zh_hans="订阅围炉，立即享有"
                />
              </p>
            </header>

            <ul>
              <li>
                <span className="feature-icon">
                  {withIcon(IconCircleFeatureReading)({ size: 'xl' })}
                </span>
                <p>
                  <Translate
                    zh_hant="作品無限免費閱讀"
                    zh_hans="作品无限免费阅读"
                  />
                </p>
              </li>
              <li>
                <span className="feature-icon">
                  {withIcon(IconCircleFeatureDiscussion)({ size: 'xl' })}
                </span>
                <p>
                  <Translate
                    zh_hant="發起眾聊，與夥伴們親密互動"
                    zh_hans="发起众聊，与伙伴们亲密互动"
                  />
                </p>
              </li>
              <li>
                <span className="feature-icon">
                  {withIcon(IconCircleFeatureConnection)({ size: 'xl' })}
                </span>
                <p>
                  <Translate
                    zh_hant="和圍爐一起成長，解鎖更多玩法"
                    zh_hans="和围炉一起成长，解锁更多玩法"
                  />
                </p>
              </li>
            </ul>

            <style jsx>{styles}</style>
          </section>
        </Dialog.Content>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="gold"
            onClick={() => {
              onConfirm()
              close()
            }}
          >
            <Translate id="confirmSubscribe" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="thinkAboutIt" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyIntroDialogDialog = (props: IntroDialogDialogProps) => (
  <Dialog.Lazy mounted={<IntroDialogDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyIntroDialogDialog
