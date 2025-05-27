import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconMoney from '@/public/static/icons/24px/money.svg'
import {
  PATHS,
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS,
  SUPPORT_SUCCESS_ANIMATION,
  SUPPORT_SUCCESS_USDT_VISITOR,
  TEST_ID,
} from '~/common/enums'
import { explorers, sleep } from '~/common/utils'
import {
  Avatar,
  Button,
  Icon,
  Spacer,
  Spinner,
  SpinnerBlock,
  TextIcon,
  useEventListener,
  ViewerContext,
} from '~/components'
import { ArticleDetailPublicQuery, Chain, HasDonatedQuery } from '~/gql/graphql'

import Donators from './Donators'
import EditCopyButton from './EditCopyButton'
import { fragments, HAS_DONATED } from './gql'
import styles from './styles.module.css'
import SupportButton from './SupportButton'

interface DonationProps {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  disable?: boolean
  toggleDonationDrawer: () => void
}

type HasDonatedArticle = NonNullable<
  HasDonatedQuery['article'] & { __typename: 'Article' }
>

const DynamicAnimation = dynamic(() => import('./Animation'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

const SupportWidget = ({
  article,
  disable,
  toggleDonationDrawer,
}: DonationProps) => {
  const viewer = useContext(ViewerContext)
  const [playLoading, setPlayLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [showAvatarAnimation, setShowAvatarAnimation] = useState(false)
  const [playSlideUp, setPlaySlideUp] = useState(false)
  const [tx, setTx] = useState<{ chain: Chain; txHash: string }>()
  const [showTx, setShowTx] = useState(false)
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
    variables: { id: article.id },
  })

  const hasDonatedArticle = hasDonatedData?.article as HasDonatedArticle
  const isViewerDonated = !!viewer.id && hasDonatedArticle?.donated
  const requestForDonation = article?.requestForDonation
  const replyToDonator = hasDonatedArticle?.replyToDonator

  useEventListener(SUPPORT_SUCCESS, () => {
    hasDonatedRefetch()
    setShowTx(true)
  })

  useEventListener(
    SUPPORT_SUCCESS_USDT_VISITOR,
    (detail: { chain: Chain; txHash: string }) => {
      setTx(detail)
    }
  )

  useEventListener(
    SUPPORT_SUCCESS_ANIMATION,
    async (payload: { [key: string]: CURRENCY }) => {
      if (!payload || Object.keys(payload).length === 0) {
        return
      }
      setCurrency(payload.currency)
      setShowAvatarAnimation(true)

      const scrollToAnimation = () => {
        const scrollTo = (element: HTMLElement) => {
          element.scrollIntoView({ behavior: 'instant', block: 'center' })
        }

        const animationEle = document.getElementById('animation')
        if (animationEle) {
          scrollTo(animationEle)
          // Fix layout changes caused by lazy loading of image heights
          setTimeout(() => scrollTo(animationEle), 100)
        }
      }

      // HKD
      if (payload.currency === CURRENCY.HKD) {
        setShowAnimation(true)
        scrollToAnimation()
        return
      }

      // LIKE、USDT
      setPlayLoading(true)
      setShowAnimation(true)
      scrollToAnimation()
      await sleep(5 * 1000)
      setPlayLoading(false)
      return
    }
  )

  const containerClasses = classNames({
    [styles.note]: true,
    [styles.slideUp]: playSlideUp,
  })

  return (
    <section className={supportWidgetClasses} id="animation">
      {showAnimation && (
        <DynamicAnimation
          playShipWaiting={playLoading}
          playEnd={() => {
            setShowAnimation(false)
            setPlaySlideUp(true)
          }}
          currency={currency}
        />
      )}

      {!showAnimation && (
        <section className={containerClasses}>
          {loading && <Spinner />}

          {!loading && isReader && (
            <>
              {isViewerDonated && (
                <>
                  {replyToDonator && (
                    <section>
                      <Avatar user={article?.author} size={48} />
                      <p>
                        <TextIcon weight="medium">
                          {article?.author.displayName}&nbsp;
                        </TextIcon>
                        <TextIcon color="greyDarker">
                          <FormattedMessage
                            defaultMessage="says: "
                            id="M05PcB"
                          />
                        </TextIcon>
                      </p>
                      <Spacer size="sp8" />
                      <p data-test-id={TEST_ID.ARTICLE_SUPPORT_REPLY}>
                        {replyToDonator}
                      </p>
                    </section>
                  )}
                  {!replyToDonator && (
                    <section>
                      <p>
                        <TextIcon weight="bold" size={16}>
                          <FormattedMessage
                            defaultMessage="🎉 Thank you for support!"
                            id="Myrqtn"
                          />
                        </TextIcon>
                      </p>
                      <Spacer size="sp8" />
                      <p data-test-id={TEST_ID.ARTICLE_SUPPORT_REPLY}>
                        <FormattedMessage
                          defaultMessage="With your support, I will be able to accumulate more energy to create."
                          id="E+dEI9"
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
                      <FormattedMessage
                        defaultMessage="Like my work? Don't forget to support and clap, let me know that you are with me on the road of creation. Keep this enthusiasm together!"
                        id="9EABqX"
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
                  toggleDonationDrawer={toggleDonationDrawer}
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

              {(isViewerDonated || (tx && showTx)) && (
                <section className={styles.transaction}>
                  <Button
                    href={
                      tx && showTx ? undefined : PATHS.ME_WALLET_TRANSACTIONS
                    }
                    htmlHref={
                      tx && showTx
                        ? `${explorers[tx.chain].url}/tx/${tx.txHash}`
                        : undefined
                    }
                    htmlTarget={tx && showTx ? '_blank' : undefined}
                  >
                    <TextIcon
                      icon={<Icon icon={IconMoney} color="greyDarker" />}
                      color="greyDarker"
                      size={12}
                      spacing={2}
                    >
                      <FormattedMessage
                        defaultMessage="My transaction history"
                        id="6E7VKR"
                      />
                    </TextIcon>
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
                  <FormattedMessage
                    defaultMessage="Like my work? Don't forget to support and clap, let me know that you are with me on the road of creation. Keep this enthusiasm together!"
                    id="9EABqX"
                  />
                </p>
              )}

              <section className={styles.donationButton}>
                <EditCopyButton article={article} disabled={disable} />
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
    </section>
  )
}

SupportWidget.fragments = fragments

export default SupportWidget
