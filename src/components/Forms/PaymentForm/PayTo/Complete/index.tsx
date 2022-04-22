import { NetworkStatus } from 'apollo-client'
import _random from 'lodash/random'
import _range from 'lodash/range'
import { useContext, useEffect, useRef } from 'react'

import {
  ArticleDigestSidebar,
  Avatar,
  Dialog,
  IconSupport,
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
          <IconSupport size="lg" color="gold" />

          <div className="complete-avatar-outline">
            <Avatar size="lg" user={recipient} />
          </div>
        </section>

        <section className="complete-message">
          <Translate
            zh_hant="馬特市民愛發電。這是你支持的第 "
            zh_hans="马特市民爱发电。这是你支持的第 "
            en="This is the "
          />
          <span className="times">{senderDonatedArticleCount}</span>
          <Translate
            zh_hant=" 篇作品，"
            zh_hans=" 篇作品，"
            en=" works you have supported"
          />
          <br />
          <UserDigest.Mini
            user={recipient}
            textSize="md"
            nameColor="green"
            hasDisplayName
          />
          <Translate
            zh_hant=" 獲得的第 "
            zh_hans=" 获得的第 "
            en=" received "
          />
          <span className="times">{recipientReceivedDonationCount}</span>
          <Translate zh_hant=" 次支持" zh_hans=" 次支持" en=" supports" />
        </section>

        {edges && edges.length > 0 && (
          <section className="related-donations">
            <header>
              <TextIcon size="sm" color="grey-darker">
                <Translate
                  zh_hant="支持過這篇作品的人也支持了"
                  zh_hans="支持过这篇作品的人也支持了"
                  en="Supporters of this work also supported:"
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
                          contentType: 'article',
                          location: i,
                          id: node.id,
                        })
                      }
                      onClickAuthor={() => {
                        analytics.trackEvent('click_feed', {
                          type: 'related_donations',
                          contentType: 'user',
                          location: i,
                          id: node.author.id,
                        })
                      }}
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
