import { NetworkStatus } from 'apollo-client'
import _random from 'lodash/random'
import _range from 'lodash/range'
import { useContext, useEffect, useRef } from 'react'

import {
  ArticleDigestSidebar,
  Avatar,
  Dialog,
  IconHeart,
  List,
  ShuffleButton,
  Spinner,
  Translate,
  usePublicQuery,
  UserDigest,
  useResponsive,
  ViewerContext,
} from '~/components'
import { TextIcon } from '~/components/TextIcon'

import { analytics } from '~/common/utils'

import { RELATED_DONATIONS } from './gql'
import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { RelatedDonations } from './__generated__/RelatedDonations'

interface Props {
  callback?: () => void
  recipient: UserDonationRecipient
  targetId: string
}

const DEFAULT_RANDOM = 0
const PAGE_COUNT = 3

const Complete: React.FC<Props> = ({ callback, recipient, targetId }) => {
  const viewer = useContext(ViewerContext)
  const isMediumUp = useResponsive('md-up')

  /**
   * Data Fetching
   */
  const { data, refetch, networkStatus } = usePublicQuery<RelatedDonations>(
    RELATED_DONATIONS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        senderUserName: viewer.userName,
        recipientUserName: recipient.userName,
        targetId,
        first: PAGE_COUNT,
        random: DEFAULT_RANDOM,
      },
    }
  )
  const isLoading = networkStatus === NetworkStatus.loading
  const isRefetching = networkStatus === NetworkStatus.setVariables

  const edges =
    data?.node?.__typename === 'Article' &&
    data.node.relatedDonationArticles.edges
  const senderDonatedArticleCount =
    data?.sender?.status?.donatedArticleCount || 1
  const recipientReceivedDonationCount =
    data?.recipient?.status?.receivedDonationCount || 1

  // shuffle
  const totalCount =
    (data?.node?.__typename === 'Article' &&
      data.node.relatedDonationArticles.totalCount) ||
    0
  const prevRandomRef = useRef(DEFAULT_RANDOM)
  const shuffle = () => {
    const prevRandom = prevRandomRef.current
    const max = Math.ceil(totalCount / PAGE_COUNT)
    const randoms = _range(0, max).filter((n) => n !== prevRandom)
    const random = randoms[_random(0, randoms.length - 1)]

    refetch({ random })
    prevRandomRef.current = random
  }

  useEffect(() => {
    if (callback) {
      callback()
    }
  }, [])

  /**
   * Render
   */
  if (isLoading) {
    return <Spinner />
  }

  return (
    <Dialog.Content hasGrow>
      <section className="container">
        <section className="complete-avatar">
          <IconHeart size="xl-m" color="red" />

          <div className="complete-avatar-outline">
            <Avatar size="lg" user={recipient} />
          </div>
        </section>

        <section className="complete-message">
          <Translate
            zh_hant="馬特市民愛發電。這是你支持的第 "
            zh_hans="马特市民爱发电。这是你支持的第 "
          />
          <span className="times">{senderDonatedArticleCount}</span>
          <Translate zh_hant=" 篇作品，" zh_hans=" 篇作品，" />
          <br />
          <UserDigest.Mini
            user={recipient}
            textSize="md"
            nameColor="green"
            hasDisplayName
          />
          <Translate zh_hant=" 獲得的第 " zh_hans=" 获得的第 " />
          <span className="times">{recipientReceivedDonationCount}</span>
          <Translate zh_hant=" 次支持" zh_hans=" 次支持" />
        </section>

        {edges && edges.length > 0 && (
          <section className="related-donations">
            <header>
              <TextIcon size="sm" color="grey-darker">
                <Translate
                  zh_hant="支持過這篇文章的人也支持了"
                  zh_hans="支持过这篇文章的人也支持了"
                />
              </TextIcon>

              {totalCount > PAGE_COUNT && (
                <ShuffleButton
                  onClick={shuffle}
                  bgColor="green-lighter"
                  color="green"
                />
              )}
            </header>

            {isRefetching && <Spinner />}

            {!isRefetching && (
              <List spacing={['base', 0]} hasBorder={false}>
                {edges.map(({ node, cursor }, i) => (
                  <List.Item key={cursor}>
                    <ArticleDigestSidebar
                      article={node}
                      hasCover={isMediumUp}
                      hasBackground
                      onClick={() =>
                        analytics.trackEvent('click_feed', {
                          type: 'related_donations',
                          styleType: 'small_cover',
                          contentType: 'article',
                          location: i,
                        })
                      }
                    />
                  </List.Item>
                ))}
              </List>
            )}
          </section>
        )}

        <style jsx>{styles}</style>
      </section>
    </Dialog.Content>
  )
}

export default Complete
