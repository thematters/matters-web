import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import jump from 'jump.js'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

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
  Spinner,
  TextIcon,
  Translate,
  useEventListener,
  ViewerContext,
} from '~/components'
import { ArticleDetailPublicQuery, HasDonatedQuery } from '~/gql/graphql'

import Donators from './Donators'
import EditCopyButton from './EditCopyButton'
import { fragments, HAS_DONATED } from './gql'
import styles from './styles.module.css'
import SupportButton from './SupportButton'

interface DonationProps {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

type HasDonatedArticle = NonNullable<
  HasDonatedQuery['article'] & { __typename: 'Article' }
>

const DynamicAnimation = dynamic(() => import('./Animation'), {
  ssr: false,
  loading: () => <Spinner />,
})

const SupportWidget = ({ article }: DonationProps) => {
  const viewer = useContext(ViewerContext)
  const [playShipWaiting, setPlayShipWaiting] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [showAvatarAnimation, setShowAvatarAnimation] = useState(false)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)
  const supportWidgetClasses = classNames({
    [styles.supportWidget]: true,
    [styles.hasCircle]: article?.access.circle,
  })
  const isReader = viewer.id !== article.author.id
  const isAuthor = viewer.id === article.author.id

  const {
    data: hasDonatedData,
    loading,
    refetch: hasDonatedRefetch,
  } = useQuery<HasDonatedQuery>(HAS_DONATED, {
    variables: { id: article.id, senderId: viewer.id },
  })

  const hasDonatedArticle = hasDonatedData?.article as HasDonatedArticle
  const isViewerDonated =
    !!viewer.id && hasDonatedArticle?.donation?.totalCount >= 1
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
        jump('#animation', { offset: -100 })
        return
      }

      // LIKE、USDT
      setPlayShipWaiting(true)
      setShowAnimation(true)
      jump('#animation', { offset: -100 })
      await sleep(5 * 1000)
      setPlayShipWaiting(false)
      hasDonatedRefetch()
      return
    }
  )

  return (
    <section className={supportWidgetClasses} id="animation">
      {showAnimation && (
        <section className={styles.donation}>
          <DynamicAnimation
            playShipWaiting={playShipWaiting}
            playEnd={() => {
              setShowAnimation(false)
            }}
            currency={currency}
          />
        </section>
      )}

      {!showAnimation && (
        <section className={`${styles.donation} ${styles.note}`}>
          {loading && <IconSpinner16 color="greyLight" size="lg" />}

          {!loading && isReader && (
            <>
              {isViewerDonated && (
                <>
                  {replyToDonator && (
                    <section>
                      <Avatar user={article?.author} size="xl" />
                      <p>
                        <TextIcon weight="md">
                          {article?.author.displayName}
                        </TextIcon>
                        <TextIcon color="greyDarker">
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

              {!isViewerDonated && (
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

              <section className={styles.donationButton}>
                <SupportButton
                  recipient={article.author}
                  targetId={article.id}
                  article={article}
                  supported={isViewerDonated}
                />
              </section>

              {article.donations.totalCount > 0 && (
                <section className={styles.donators}>
                  <Donators
                    article={article}
                    showAvatarAnimation={showAvatarAnimation}
                  />
                </section>
              )}

              {isViewerDonated && (
                <section className={styles.transaction}>
                  <span className={styles.transactionLeft}>
                    <Translate zh_hant="查看" zh_hans="查看" en="View" />
                  </span>
                  <Button href={PATHS.ME_WALLET_TRANSACTIONS}>
                    <span className={styles.transactionButton}>
                      <TextIcon
                        icon={<IconDollarCircle16 />}
                        color="gold"
                        size="xs"
                      >
                        <Translate
                          zh_hant="交易記錄"
                          zh_hans="交易记录"
                          en="Transaction History"
                        />
                      </TextIcon>
                    </span>
                  </Button>
                </section>
              )}
            </>
          )}

          {!loading && isAuthor && (
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

              <section className={styles.donationButton}>
                <EditCopyButton article={article} />
              </section>

              {article.donations.totalCount > 0 && (
                <section className={styles.donators}>
                  <Donators
                    article={article}
                    showAvatarAnimation={showAvatarAnimation}
                    isAuthor={isAuthor}
                  />
                </section>
              )}
            </>
          )}
        </section>
      )}

      {article.access.circle && (
        <section className={styles.circle}>
          <CircleDigest.Rich
            circle={article.access.circle}
            bgColor="greyLighter"
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
    </section>
  )
}

SupportWidget.fragments = fragments

export default SupportWidget
