import { useLazyQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
// import jump from 'jump.js'
import { useContext, useEffect, useState } from 'react'

import {
  PATHS,
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS_ANIMATION,
  TEST_ID,
} from '~/common/enums'
import { analytics, sleep } from '~/common/utils'
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
  ViewerContext,
} from '~/components'
import { ArticleDetailPublicQuery, HasDonatedQuery } from '~/gql/graphql'

import Animation from './Animation'
import Donators from './Donators'
import { fragments, HAS_DONATED } from './gql'
import styles from './styles.css'
import SupportButton from './SupportButton'

interface DonationProps {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

type HasDonatedArticle = NonNullable<
  HasDonatedQuery['article'] & { __typename: 'Article' }
>

const SupportWidget = ({ article }: DonationProps) => {
  const viewer = useContext(ViewerContext)
  const [playShipWaiting, setPlayShipWaiting] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [showAvatarAnimation, setShowAvatarAnimation] = useState(false)
  const [supported, setSupported] = useState(false)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)
  const supportWidgetClasses = classNames({
    'support-widget': true,
    hasCircle: article?.access.circle,
  })

  const [
    getHasDonated,
    { data: hasDonatedData, loading, refetch: hasDonatedRefetch },
  ] = useLazyQuery<HasDonatedQuery>(HAS_DONATED, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (!viewer.id) return

    getHasDonated({
      variables: {
        id: article.id,
        senderId: viewer.id,
      },
    })
  }, [viewer.id])

  const hasDonatedArticle = hasDonatedData?.article as HasDonatedArticle

  const isViewerDonated = hasDonatedArticle?.donation?.totalCount === 1
  useEffect(() => {
    if (isViewerDonated) {
      setSupported(true)
    }
  }, [isViewerDonated])

  const requestForDonation = article?.requestForDonation
  const replyToDonator = hasDonatedArticle?.replyToDonator

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
        console.log('refuse hkd, showanimation', showAnimation)
        // jump('#animation', { offset: -100 })
        return
      }

      // LIKE、USDT
      setPlayShipWaiting(true)
      setShowAnimation(true)
      console.log('refuse usdt, likecoin, showanimation', showAnimation)
      // jump('#animation', { offset: -100 })
      await sleep(5 * 1000)
      setPlayShipWaiting(false)
      hasDonatedRefetch()
      return
    }
  )

  return (
    <section className={supportWidgetClasses} id="animation">
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
        <section className="donation note">
          {loading && <IconSpinner16 color="grey-light" size="lg" />}
          {!loading && (
            <>
              {supported && (
                <>
                  {replyToDonator && (
                    <section>
                      <Avatar user={article?.author} size="xl" />
                      <p>
                        <TextIcon weight="md">
                          {article?.author.displayName}
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
                      <p data-test-id={TEST_ID.ARTICLE_SUPPORT_REPLY}>
                        {replyToDonator}
                      </p>
                    </section>
                  )}
                  {!replyToDonator && (
                    <section>
                      <p>
                        <TextIcon weight="bold" size="md">
                          <Translate
                            zh_hant="🎉 感謝支持！"
                            zh_hans="🎉 感谢支持！"
                            en="🎉 Thank you for support!"
                          />
                        </TextIcon>
                      </p>
                      <Spacer size="xtight" />
                      <p data-test-id={TEST_ID.ARTICLE_SUPPORT_REPLY}>
                        <Translate
                          zh_hant="感謝支持，創作這條路不容易，有你的支持我將能夠蓄積更多能量創作。"
                          zh_hans="感谢支持，创作这条路不容易，有你的支持我将能够蓄积更多能量创作。"
                          en="Thank for your support. The way isn’t always easy being a creator. With your generous support, I can accumulate more energy to go on."
                        />
                      </p>
                    </section>
                  )}
                </>
              )}

              {!supported && (
                <>
                  {requestForDonation && (
                    <p data-test-id={TEST_ID.ARTICLE_SUPPORT_REQUEST}>
                      {requestForDonation}
                    </p>
                  )}
                  {!requestForDonation && (
                    <p data-test-id={TEST_ID.ARTICLE_SUPPORT_REQUEST}>
                      <Translate
                        zh_hant="喜歡我的文章嗎？"
                        zh_hans="喜欢我的文章吗？"
                        en="Like my work?"
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
                          en="Transaction History"
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
