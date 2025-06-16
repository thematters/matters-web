import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconThumbsDown from '@/public/static/icons/24px/thumb-down.svg'
import IconThumbsUp from '@/public/static/icons/24px/thumb-up.svg'
import { Button, Icon, LanguageContext, ViewerContext } from '~/components'
import {
  ChannelArticleFragment,
  SubmitTopicChannelFeedbackMutation,
  TopicChannelFeedbackType,
} from '~/gql/graphql'

import ChannelDrawer from './ChannelDrawer'
import { fragments, SUBMIT_TOPIC_CHANNEL_FEEDBACK } from './gql'
import styles from './styles.module.css'

const Channel = ({ article }: { article: ChannelArticleFragment }) => {
  console.log({ article })
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const isAuthor = viewer?.id === article.author?.id
  const [hasThumbsUp, setHasThumbsUp] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const topicChannel = article.classification?.topicChannel
  const hasTopicChannel = Array.isArray(topicChannel?.channels)
  const hasFeedback = !!topicChannel?.feedback
  const allChannelsDisabled = topicChannel?.channels?.every(
    (channel) => !channel.enabled
  )
  const feedbackToLatestChannel =
    hasFeedback &&
    topicChannel?.feedback?.type === TopicChannelFeedbackType.Negative &&
    allChannelsDisabled
  const isInLatestChannel =
    (hasTopicChannel && topicChannel?.channels?.length === 0) ||
    (hasTopicChannel && allChannelsDisabled)
  console.log({ feedbackToLatestChannel })

  const [submitTopicChannelFeedback] =
    useMutation<SubmitTopicChannelFeedbackMutation>(
      SUBMIT_TOPIC_CHANNEL_FEEDBACK
    )

  const thumbsUp = () => {
    submitTopicChannelFeedback({
      variables: {
        article: article.id,
        type: TopicChannelFeedbackType.Positive,
        channels: [],
      },
    }).then(() => {
      setHasThumbsUp(true)
    })
  }

  const thumbsDown = () => {
    toggleDrawer()
  }

  const handleThumbsDown = async (channels: string[]) => {
    await submitTopicChannelFeedback({
      variables: {
        article: article.id,
        type: TopicChannelFeedbackType.Negative,
        channels,
      },
    })
  }

  const renderChannelNames = () => (
    <>
      {topicChannel?.channels?.map((channel, index) => {
        if (!channel.enabled) {
          return null
        }
        return (
          <span key={channel.channel.id} className={styles.channelNames}>
            <span className={styles.channelNames}>
              {lang === 'zh_hans'
                ? channel.channel.nameZhHans
                : lang === 'zh_hant'
                  ? channel.channel.nameZhHant
                  : channel.channel.nameEn}
            </span>
            {index < (topicChannel?.channels?.length ?? 0) - 1 &&
              (lang === 'zh_hans' || lang === 'zh_hant' ? '、' : ', ')}
          </span>
        )
      })}
    </>
  )

  if (!isAuthor && (!hasTopicChannel || isInLatestChannel)) {
    return null
  }

  if (!isAuthor && hasTopicChannel && !isInLatestChannel) {
    return (
      <section className={styles.content}>
        <FormattedMessage
          defaultMessage="Recommended to channel: {channelNames}"
          id="0mQE3E"
          values={{
            channelNames: renderChannelNames(),
          }}
        />
      </section>
    )
  }

  if (isAuthor && !hasTopicChannel) {
    return (
      <section className={styles.content}>
        <FormattedMessage
          defaultMessage="Recommending channels for your work…"
          id="S+D/hf"
        />
      </section>
    )
  }

  if (isAuthor && isInLatestChannel && !hasFeedback) {
    return (
      <>
        <section className={styles.content}>
          <span>
            <FormattedMessage
              defaultMessage="We couldn’t find a suitable channel to recommend this work"
              id="4M9oG6"
            />
            <FormattedMessage
              defaultMessage=". {SuggestButton}?"
              id="7HPPqs"
              values={{
                SuggestButton: (
                  <Button
                    onClick={toggleDrawer}
                    textColor="black"
                    textActiveColor="greyDarker"
                  >
                    <FormattedMessage
                      defaultMessage="Suggest one"
                      id="Jv9SoD"
                    />
                  </Button>
                ),
              }}
            />
          </span>
        </section>
        <ChannelDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onConfirm={handleThumbsDown}
          selectedChannels={
            topicChannel?.channels?.map((channel) => channel.channel.id) ?? []
          }
        />
      </>
    )
  }

  if (isAuthor && isInLatestChannel && hasFeedback) {
    return (
      <>
        <section className={styles.content}>
          <span>
            <FormattedMessage
              defaultMessage="We couldn’t find a suitable channel to recommend this work"
              id="4M9oG6"
            />
          </span>
        </section>
      </>
    )
  }

  return (
    <>
      <section className={styles.content}>
        {!hasFeedback && !hasThumbsUp && (
          <>
            <span>
              <FormattedMessage
                defaultMessage="Your work has been recommended to the channels: {channelNames}. Are you satisfied with the result?"
                id="dZlT9q"
                values={{
                  channelNames: renderChannelNames(),
                }}
              />
            </span>
            <Button
              aria-label="Thumbs up"
              onClick={thumbsUp}
              textColor="black"
              textActiveColor="greyDarker"
              size={['1.125rem', '1.125rem']}
            >
              <Icon icon={IconThumbsUp} size={12} />
            </Button>
            <Button
              aria-label="Thumbs down"
              onClick={thumbsDown}
              textColor="black"
              textActiveColor="greyDarker"
              size={['1.125rem', '1.125rem']}
            >
              <Icon icon={IconThumbsDown} size={12} />
            </Button>
          </>
        )}
        {(hasFeedback || hasThumbsUp) && (
          <>
            <span>
              <FormattedMessage
                defaultMessage="Recommended to channel: {channelNames}"
                id="0mQE3E"
                values={{
                  channelNames: renderChannelNames(),
                }}
              />
            </span>
            {hasThumbsUp && (
              <FormattedMessage
                defaultMessage=". Really appreciate it!"
                id="wlQosy"
              />
            )}
          </>
        )}
      </section>
      <ChannelDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onConfirm={handleThumbsDown}
        selectedChannels={
          topicChannel?.channels?.map((channel) => channel.channel.id) ?? []
        }
      />
    </>
  )
}

Channel.fragments = fragments

export default Channel
