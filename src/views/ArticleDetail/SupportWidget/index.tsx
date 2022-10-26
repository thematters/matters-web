import classNames from 'classnames'
import { useContext, useState } from 'react'

import {
  Button,
  CircleDigest,
  IconDollarCircle16,
  TextIcon,
  Translate,
  useEventListener,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import PAY_TO from '~/components/GQL/mutations/payTo'
import updateDonation from '~/components/GQL/updates/donation'

import {
  CHAIN,
  PATHS,
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS_ANIMATION,
} from '~/common/enums'
import { analytics } from '~/common/utils'

import Animation from './Animation'
import DonationButton from './DonationButton'
import Donators from './Donators'
import { fragments } from './gql'
import styles from './styles.css'

import { PayTo as PayToMutate } from '~/components/GQL/mutations/__generated__/PayTo'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'

interface DonationProps {
  article: ArticleDetailPublic_article
}

const SupportWidget = ({ article }: DonationProps) => {
  const { getQuery } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const viewer = useContext(ViewerContext)
  const [playShipWaiting, setPlayShipWaiting] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [showAvatarAnimation, setShowAvatarAnimation] = useState(false)
  const [showTransaction, setShowTransaction] = useState(false)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)
  const supportWidgetClasses = classNames({
    'support-widget': true,
    hasCircle: article.access.circle,
  })

  console.log({ article })

  const [payTo] = useMutation<PayToMutate>(PAY_TO)

  useEventListener(
    SUPPORT_SUCCESS_ANIMATION,
    async (payload: { [key: string]: any }) => {
      if (!payload || Object.keys(payload).length === 0) {
        return
      }
      setCurrency(payload.currency)
      setShowAvatarAnimation(true)
      setShowTransaction(true)

      // HKD、LikeCoin
      if (payload.currency !== CURRENCY.USDT) {
        setShowAnimation(true)
        return
      }

      // USDT
      setPlayShipWaiting(true)
      setShowAnimation(true)
      const { transactionResult, amount, recipientId, targetId } =
        payload

      await payTo({
        variables: {
          amount,
          currency,
          purpose: 'donation',
          recipientId,
          targetId,
          chain: CHAIN.POLYGON,
          txHash: transactionResult.hash,
        },
        update: (cache) => {
          updateDonation({
            cache,
            mediaHash,
            viewer,
          })
        },
      })
      await transactionResult.wait()
      setPlayShipWaiting(false)
    }
  )

  return (
    <section className={supportWidgetClasses}>
      {showAnimation && (
        <section className="donation">
          <Animation
            playShipWaiting={playShipWaiting}
            playEnd={() => {
              setShowAnimation(false)
            }}
            currency={currency}
          />
        </section>
      )}
      {!showAnimation && (
        <section className="donation">
          <p>
            <Translate
              zh_hant="喜歡我的文章嗎？"
              zh_hans="喜欢我的文章吗？"
              en="Like my work??"
            />
            <br />
            <Translate
              zh_hant="別忘了給點支持與讚賞，讓我知道創作的路上有你陪伴。"
              zh_hans="别忘了给点支持与赞赏，让我知道创作的路上有你陪伴。"
              en="Don't forget to support or like, so I know you are with me.."
            />
          </p>

          <section className="donation-button">
            <DonationButton
              recipient={article.author}
              targetId={article.id}
              article={article}
            />
          </section>

          <section className="donators">
            <Donators
              article={article}
              showAvatarAnimation={showAvatarAnimation}
            />
          </section>

          {showTransaction && (
            <p className="transaction">
              <span>
                <Translate zh_hant="查看" zh_hans="查看" en="See" />
              </span>
              <Button href={PATHS.ME_WALLET_TRANSACTIONS}>
                <span className="transaction-button">
                  <TextIcon icon={<IconDollarCircle16 />} color="gold">
                    <Translate
                      zh_hant="交易紀錄"
                      zh_hans="交易纪录"
                      en="Transaction"
                    />
                  </TextIcon>
                </span>
              </Button>
            </p>
          )}
        </section>
      )}

      {article.access.circle && (
        <section className="circle">
          <CircleDigest.Rich
            circle={article.access.circle}
            bgColor="grey-lighter"
            hasFooter
            hasPrice
            onClickPrice={() => {
              analytics.trackEvent('click_button', {
                type: 'subscribe_circle_price',
                pageType: 'article_detail',
              })
            }}
          />
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

SupportWidget.fragments = fragments

export default SupportWidget
