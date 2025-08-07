import { useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import { useEffect, useId } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  Form,
  List,
  Spinner,
  toast,
  useDialogSwitch,
  useMutation,
} from '~/components'
import { BATCH_PIN_UNPIN_CHANNEL_ARTICLES } from '~/components/GQL/mutations/togglePinChannelArticles'
import {
  BatchPinUnpinChannelArticlesMutation,
  GetArticleTopicChannelsQuery,
  SetArticleTopicChannelsMutation,
} from '~/gql/graphql'

import { GET_ARTICLE_TOPIC_CHANNELS, SET_ARTICLE_TOPIC_CHANNELS } from './gql'
import styles from './styles.module.css'

export type SetArticleChannelsDialogProps = {
  article: { id: string; shortHash: string }
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

interface FormValues {
  channels: string[]
  pinnedChannels: string[]
}

const BaseSetArticleChannelsDialog = ({
  article,
  children,
}: SetArticleChannelsDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const { data, loading } = useQuery<GetArticleTopicChannelsQuery>(
    GET_ARTICLE_TOPIC_CHANNELS,
    {
      variables: {
        shortHash: article.shortHash,
      },
      fetchPolicy: 'no-cache',
    }
  )
  const [setArticleChannels] = useMutation<SetArticleTopicChannelsMutation>(
    SET_ARTICLE_TOPIC_CHANNELS,
    undefined,
    { showToast: true }
  )

  const [batchPinUnpinChannelArticles] =
    useMutation<BatchPinUnpinChannelArticlesMutation>(
      BATCH_PIN_UNPIN_CHANNEL_ARTICLES,
      undefined,
      { showToast: true }
    )

  const channelsEnabled =
    data?.article?.classification?.topicChannel?.enabled ?? true
  const allChannels = data?.channels.filter(
    (channel) => channel.__typename == 'TopicChannel'
  )
  const articleChannels =
    data?.article?.classification?.topicChannel?.channels?.filter(
      (channel) => channel.enabled
    )

  const formId = useId()

  const { values, handleSubmit, isSubmitting, setFieldValue } =
    useFormik<FormValues>({
      initialValues: { channels: [], pinnedChannels: [] },
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async ({ channels, pinnedChannels }, { setSubmitting }) => {
        try {
          await setArticleChannels({
            variables: { id: article.id, channels },
          })

          const unpinChannels = channels.filter(
            (channel) => !pinnedChannels.includes(channel)
          )

          await batchPinUnpinChannelArticles({
            variables: {
              pinChannels: pinnedChannels,
              unpinChannels: unpinChannels,
              articles: [article.id],
            },
          })

          toast.success({
            message: '分類已修正',
          })

          setSubmitting(false)
          closeDialog()
        } catch {
          toast.error({ message: '分類修正失敗' })
          setSubmitting(false)
        }
      },
    })

  const handleToggleChannel = (channelId: string) => {
    const currentChannels = [...values.channels]
    const currentPinnedChannels = [...values.pinnedChannels]
    const index = currentChannels.indexOf(channelId)

    if (index >= 0) {
      currentChannels.splice(index, 1)
      // Remove from pinned channels if it exists
      if (currentPinnedChannels.includes(channelId)) {
        currentPinnedChannels.splice(
          currentPinnedChannels.indexOf(channelId),
          1
        )
      }
    } else {
      currentChannels.push(channelId)
    }

    setFieldValue('channels', currentChannels)
    setFieldValue('pinnedChannels', currentPinnedChannels)
  }

  const handleTogglePinnedChannel = (channelId: string) => {
    const currentChannels = [...values.channels]
    const currentPinnedChannels = [...values.pinnedChannels]
    const index = currentPinnedChannels.indexOf(channelId)

    if (index >= 0) {
      currentPinnedChannels.splice(index, 1)
      // Add to channels if it doesn't exist
      if (!currentChannels.includes(channelId)) {
        currentChannels.push(channelId)
      }
    } else {
      currentPinnedChannels.push(channelId)
      if (!currentChannels.includes(channelId)) {
        currentChannels.push(channelId)
      }
    }

    setFieldValue('pinnedChannels', currentPinnedChannels)
    setFieldValue('channels', currentChannels)
  }

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      {!channelsEnabled && (
        <span className={styles.disabledTip}>該文章反饋不参与频道推荐</span>
      )}
      <List>
        {allChannels?.map((channel) => (
          <List.Item key={channel.id}>
            <section className={styles.item}>
              <Form.SquareCheckBox
                name="channels"
                value={channel.id}
                disabled={!('providerId' in channel && channel.providerId)}
                contents={
                  'name' in channel
                    ? channel.name +
                      (channel.parent ? `(${channel.parent.name})` : '')
                    : channel.id
                }
                checked={values.channels.includes(channel.id)}
                onChange={() => handleToggleChannel(channel.id)}
              />
              <section className={styles.pinnedChannel}>
                <Form.SquareCheckBox
                  name="pinnedChannels"
                  disabled={'enabled' in channel && !channel.enabled}
                  value={channel.id}
                  contents={
                    'enabled' in channel && !channel.enabled ? '' : '置頂'
                  }
                  color="greyDarker"
                  checked={values.pinnedChannels.includes(channel.id)}
                  onChange={() => handleTogglePinnedChannel(channel.id)}
                />
              </section>
            </section>
          </List.Item>
        ))}
      </List>
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      color="green"
      loading={isSubmitting}
      disabled={loading || isSubmitting}
    />
  )

  useEffect(() => {
    if (!articleChannels || articleChannels.length === 0) {
      return
    }

    setFieldValue(
      'channels',
      articleChannels.filter((c) => c.enabled).map((c) => c.channel.id)
    )

    setFieldValue(
      'pinnedChannels',
      articleChannels.filter((c) => c.pinned).map((c) => c.channel.id)
    )
  }, [articleChannels?.join(',')])

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title="頻道標籤管理"
          closeDialog={closeDialog}
          rightBtn={SubmitButton}
        />

        <Dialog.Content>{loading ? <Spinner /> : InnerForm}</Dialog.Content>

        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
                color="greyDarker"
                onClick={closeDialog}
              />
              {SubmitButton}
            </>
          }
        />
      </Dialog>
    </>
  )
}

const SetArticleChannelsDialog = (props: SetArticleChannelsDialogProps) => (
  <Dialog.Lazy mounted={<BaseSetArticleChannelsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default SetArticleChannelsDialog
