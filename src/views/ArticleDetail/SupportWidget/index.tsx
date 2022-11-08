import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import {
  Avatar,
  Button,
  CircleDigest,
  IconDollarCircle16,
  IconSpinner16,
  Spacer,
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
import { analytics, sleep } from '~/common/utils'

import Animation from './Animation'
import Donators from './Donators'
import { fragments, HAS_DONATED } from './gql'
import styles from './styles.css'
import SupportButton from './SupportButton'

import { PayTo as PayToMutate } from '~/components/GQL/mutations/__generated__/PayTo'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
import { HasDonated } from './__generated__/HasDonated'

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
  const [supported, setSupported] = useState(false)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)
  const supportWidgetClasses = classNames({
    'support-widget': true,
    hasCircle: article.access.circle,
  })

  const {
    loading,
    data: hasDonatedData,
    refetch: hasDonatedRefetch,
  } = useQuery<HasDonated>(HAS_DONATED, {
    fetchPolicy: 'network-only',
    variables: { mediaHash, senderId: viewer.id },
  })

  useEffect(() => {
    if (hasDonatedData) {
      if (
        viewer.id !== '' &&
        hasDonatedData.article?.donation.totalCount === 1
      ) {
        setSupported(true)
      }
    }
  }, [hasDonatedData])

  const requestForDonation = article.requestForDonation
  const replyToDonator = hasDonatedData?.article?.replyToDonator?.replaceAll(
    '#',
    ` ${viewer.displayName} `
  )

  const [payTo] = useMutation<PayToMutate>(PAY_TO)

  useEventListener(
    SUPPORT_SUCCESS_ANIMATION,
    async (payload: { [key: string]: any }) => {
      if (!payload || Object.keys(payload).length === 0) {
        return
      }
      setCurrency(payload.currency)
      setShowAvatarAnimation(true)
      // HKD
      if (payload.currency === CURRENCY.HKD) {
        setShowAnimation(true)
        hasDonatedRefetch()
        return
      }

      // LIKE
      if (payload.currency === CURRENCY.LIKE) {
        setPlayShipWaiting(true)
        setShowAnimation(true)
        await sleep(5 * 1000)
        setPlayShipWaiting(false)
        hasDonatedRefetch()
        return
      }

      // USDT
      setPlayShipWaiting(true)
      setShowAnimation(true)
      const { transactionResult, amount, recipientId, targetId } = payload

      await payTo({
        variables: {
          amount,
          currency: payload.currency,
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
      hasDonatedRefetch()
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
          {loading && <IconSpinner16 color="grey-light" size="lg" />}
          {!loading && (
            <>
              {supported && (
                <>
                  {replyToDonator && (
                    <section>
                      <Avatar user={article.author} size="xl" />
                      <p>
                        <TextIcon weight="md">
                          {article.author.displayName}
                        </TextIcon>
                        <TextIcon color="grey-darker">
                          <Translate
                            zh_hant="&nbsp;想對你說："
                            zh_hans="&nbsp;想對你說："
                            en="&nbsp;says: "
                          />
                        </TextIcon>
                      </p>
                      <Spacer size="xtight" />
                      <p>{replyToDonator}</p>
                    </section>
                  )}
                  {!replyToDonator && (
                    <section>
                      <p>
                        <TextIcon weight="bold" size="md">
                          <Translate
                            zh_hant="🎉 感謝支持！"
                            zh_hans="🎉 感謝支持！"
                            en="🎉 Thank you for support!"
                          />
                        </TextIcon>
                      </p>
                      <Spacer size="xtight" />
                      <p>
                        <Translate
                          zh_hant="感謝 "
                          zh_hans="感謝 "
                          en="Thank "
                        />
                        <span>{viewer.displayName}</span>
                        <Translate
                          zh_hant=" 的支持，創作這條路不容易，有你的支持我將能夠蓄積更多能量創作。"
                          zh_hans=" 的支持，創作這條路不容易，有你的支持我將能夠蓄積更多能量創作。"
                          en=" for your support. The way isn’t always easy being a creator. With your generous support, I can accumulate more energy to go on."
                        />
                      </p>
                    </section>
                  )}
                </>
              )}

              {!supported && (
                <>
                  {requestForDonation && <p>{requestForDonation}</p>}
                  {!requestForDonation && (
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
                  )}
                </>
              )}

              <section className="donation-button">
                <SupportButton
                  recipient={article.author}
                  targetId={article.id}
                  article={article}
                  supported={supported}
                />
              </section>

              {article.donations.totalCount > 0 && (
                <section className="donators">
                  <Donators
                    article={article}
                    showAvatarAnimation={showAvatarAnimation}
                  />
                </section>
              )}

              {supported && (
                <section className="transaction">
                  <span className="transaction-left">
                    <Translate zh_hant="查看" zh_hans="查看" en="View" />
                  </span>
                  <Button href={PATHS.ME_WALLET_TRANSACTIONS}>
                    <span className="transaction-button">
                      <TextIcon
                        icon={<IconDollarCircle16 />}
                        color="gold"
                        size="xs"
                      >
                        <Translate
                          zh_hant="交易紀錄"
                          zh_hans="交易纪录"
                          en="transaction history"
                        />
                      </TextIcon>
                    </span>
                  </Button>
                </section>
              )}
            </>
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
