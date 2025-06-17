import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconThumbsDown from '@/public/static/icons/24px/thumb-down.svg'
import IconThumbsUp from '@/public/static/icons/24px/thumb-up.svg'
import { toPath } from '~/common/utils'
import {
  Button,
  Icon,
  LanguageContext,
  Media,
  ViewerContext,
} from '~/components'
import {
  ChannelArticleFragment,
  SubmitTopicChannelFeedbackMutation,
  TopicChannelFeedbackType,
} from '~/gql/graphql'

import { ChannelDialog } from './ChannelDialog'
import ChannelDrawer from './ChannelDrawer'
import { fragments, SUBMIT_TOPIC_CHANNEL_FEEDBACK } from './gql'
import styles from './styles.module.css'

interface ChannelProps {
  article: ChannelArticleFragment
}

interface ChannelState {
  hasThumbsUp: boolean
  isDrawerOpen: boolean
}

interface ChannelData {
  topicChannel: ChannelArticleFragment['classification']['topicChannel']
  hasTopicChannel: boolean
  hasFeedback: boolean
  isInLatestChannel: boolean
  hasAntiFlooded: boolean
  enabledChannels: NonNullable<
    ChannelArticleFragment['classification']['topicChannel']['channels']
  >
}

const Channel = ({ article }: ChannelProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const isAuthor = viewer?.id === article.author?.id

  const [state, setState] = useState<ChannelState>({
    hasThumbsUp: false,
    isDrawerOpen: false,
  })

  const toggleDrawer = () =>
    setState((prev) => ({ ...prev, isDrawerOpen: !prev.isDrawerOpen }))

  const [submitTopicChannelFeedback] =
    useMutation<SubmitTopicChannelFeedbackMutation>(
      SUBMIT_TOPIC_CHANNEL_FEEDBACK
    )

  const getChannelData = (): ChannelData => {
    const topicChannel = article.classification?.topicChannel
    const hasTopicChannel = Array.isArray(topicChannel?.channels)
    const hasFeedback = !!topicChannel?.feedback
    const allChannelsDisabled = topicChannel?.channels?.every(
      (channel) => !channel.enabled
    )
    const isInLatestChannel =
      (hasTopicChannel && topicChannel?.channels?.length === 0) ||
      (hasTopicChannel && !!allChannelsDisabled)
    const hasAntiFlooded = !!topicChannel?.channels?.some(
      (channel) => channel.antiFlooded
    )
    const enabledChannels =
      topicChannel?.channels?.filter((channel) => channel.enabled) || []

    return {
      topicChannel,
      hasTopicChannel,
      hasFeedback,
      isInLatestChannel,
      hasAntiFlooded,
      enabledChannels,
    }
  }

  const channelData = getChannelData()

  const handleThumbsUp = async () => {
    try {
      await submitTopicChannelFeedback({
        variables: {
          article: article.id,
          type: TopicChannelFeedbackType.Positive,
          channels: [],
        },
      })
      setState((prev) => ({ ...prev, hasThumbsUp: true }))
    } catch (error) {
      console.error('Failed to submit positive feedback:', error)
    }
  }

  const handleThumbsDown = async (channels: string[]) => {
    try {
      await submitTopicChannelFeedback({
        variables: {
          article: article.id,
          type: TopicChannelFeedbackType.Negative,
          channels,
        },
      })
    } catch (error) {
      console.error('Failed to submit negative feedback:', error)
    }
  }

  const renderChannelNames = () => {
    return (
      <>
        {channelData.enabledChannels.map((channel, index) => {
          const channelName =
            lang === 'zh_hans'
              ? channel.channel.nameZhHans
              : lang === 'zh_hant'
                ? channel.channel.nameZhHant
                : channel.channel.nameEn

          const separator =
            index < channelData.enabledChannels.length - 1
              ? lang === 'zh_hans' || lang === 'zh_hant'
                ? '、'
                : ', '
              : ''

          const path = toPath({
            page: 'channelDetail',
            channel: {
              id: channel.channel.id,
              shortHash: channel.channel.shortHash,
            },
          })

          return (
            <span key={channel.channel.id} className={styles.channelNames}>
              <Link {...path} className={styles.channelName}>
                {channelName}
              </Link>
              {separator}
            </span>
          )
        })}
      </>
    )
  }

  const AntiFloodedNotice = () => {
    if (!channelData.hasAntiFlooded) return null

    return (
      <section className={styles.content}>
        <FormattedMessage
          defaultMessage="We’ve detected that several of your recent works have been recommended to related channels. They may not appear at the same time"
          id="DtO278"
        />
      </section>
    )
  }

  const SuggestChannelButton = () => (
    <Button
      onClick={toggleDrawer}
      textColor="black"
      textActiveColor="greyDarker"
    >
      <FormattedMessage defaultMessage="Suggest one" id="Jv9SoD" />
    </Button>
  )

  const FeedbackButtons = ({ openDialog }: { openDialog: () => void }) => (
    <>
      <Button
        aria-label="Thumbs up"
        onClick={handleThumbsUp}
        textColor="black"
        textActiveColor="greyDarker"
        size={['1.125rem', '1.125rem']}
      >
        <Icon icon={IconThumbsUp} size={12} />
      </Button>
      <Media lessThan="md">
        <Button
          aria-label="Thumbs down"
          onClick={openDialog}
          textColor="black"
          textActiveColor="greyDarker"
          size={['1.125rem', '1.125rem']}
        >
          <Icon icon={IconThumbsDown} size={12} />
        </Button>
      </Media>
      <Media greaterThanOrEqual="md">
        <Button
          aria-label="Thumbs down"
          onClick={toggleDrawer}
          textColor="black"
          textActiveColor="greyDarker"
          size={['1.125rem', '1.125rem']}
        >
          <Icon icon={IconThumbsDown} size={12} />
        </Button>
      </Media>
    </>
  )

  const ChannelDrawerComponent = (
    <ChannelDrawer
      isOpen={state.isDrawerOpen}
      onClose={() => setState((prev) => ({ ...prev, isDrawerOpen: false }))}
      onConfirm={handleThumbsDown}
      selectedChannels={
        channelData.topicChannel?.channels?.map(
          (channel) => channel.channel.id
        ) ?? []
      }
    />
  )

  const renderContent = () => {
    // Non-author and no channel or in latest channel - hide
    if (
      !isAuthor &&
      (!channelData.hasTopicChannel || channelData.isInLatestChannel)
    ) {
      return null
    }

    // Non-author with channel recommendations
    if (
      !isAuthor &&
      channelData.hasTopicChannel &&
      !channelData.isInLatestChannel
    ) {
      return (
        <>
          <section className={styles.content}>
            <FormattedMessage
              defaultMessage="Recommended to channel: {channelNames}"
              id="0mQE3E"
              values={{ channelNames: renderChannelNames() }}
            />
          </section>
          <AntiFloodedNotice />
        </>
      )
    }

    // Author with no channel data - recommending
    if (isAuthor && !channelData.hasTopicChannel) {
      return (
        <>
          <section className={styles.content}>
            <FormattedMessage
              defaultMessage="Recommending channels for your work…"
              id="S+D/hf"
            />
          </section>
          <AntiFloodedNotice />
        </>
      )
    }

    // Author in latest channel with no feedback - show suggest button
    if (isAuthor && channelData.isInLatestChannel && !channelData.hasFeedback) {
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
                values={{ SuggestButton: <SuggestChannelButton /> }}
              />
            </span>
          </section>
          <AntiFloodedNotice />
          {ChannelDrawerComponent}
        </>
      )
    }

    // Author in latest channel with feedback - show message only
    if (isAuthor && channelData.isInLatestChannel && channelData.hasFeedback) {
      return (
        <>
          <section className={styles.content}>
            <FormattedMessage
              defaultMessage="We couldn’t find a suitable channel to recommend this work"
              id="4M9oG6"
            />
          </section>
          <AntiFloodedNotice />
        </>
      )
    }

    // Author with channel recommendations - show feedback interface
    return (
      <ChannelDialog onConfirm={handleThumbsDown}>
        {({ openDialog }) => (
          <>
            <section className={styles.content}>
              {!channelData.hasFeedback && !state.hasThumbsUp ? (
                <>
                  <Media lessThan="md">
                    <span>
                      <FormattedMessage
                        defaultMessage="Your work has been recommended to the channels: {channelNames}"
                        id="eNv3Wm"
                        values={{ channelNames: renderChannelNames() }}
                      />
                    </span>
                    <br />
                    <section className={styles.feedbackButtons}>
                      <span>
                        <FormattedMessage
                          defaultMessage="Are you satisfied with the result?"
                          id="GvHgNX"
                        />
                      </span>
                      <FeedbackButtons openDialog={openDialog} />
                    </section>
                  </Media>
                  <Media greaterThanOrEqual="md">
                    <section className={styles.feedbackButtons}>
                      <span>
                        <FormattedMessage
                          defaultMessage="Your work has been recommended to the channels: {channelNames}. Are you satisfied with the result?"
                          id="dZlT9q"
                          values={{ channelNames: renderChannelNames() }}
                        />
                      </span>
                      <FeedbackButtons openDialog={openDialog} />
                    </section>
                  </Media>
                </>
              ) : (
                <>
                  <span>
                    <FormattedMessage
                      defaultMessage="Recommended to channel: {channelNames}"
                      id="0mQE3E"
                      values={{ channelNames: renderChannelNames() }}
                    />
                  </span>
                  {state.hasThumbsUp && (
                    <FormattedMessage
                      defaultMessage=". Really appreciate it!"
                      id="wlQosy"
                    />
                  )}
                </>
              )}
            </section>
            <AntiFloodedNotice />
            {ChannelDrawerComponent}
          </>
        )}
      </ChannelDialog>
    )
  }

  return renderContent()
}

Channel.fragments = fragments

export default Channel
