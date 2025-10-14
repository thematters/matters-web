import { useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import { useEffect, useId } from 'react'
import { FormattedMessage } from 'react-intl'

import { Z_INDEX } from '~/common/enums'
import {
  Dialog,
  Form,
  List,
  Spinner,
  toast,
  Tooltip,
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
  type TopicChannel = {
    id: string
    name?: string
    enabled?: boolean
    parent?: { id: string; name?: string } | null
    providerId?: string | null
    __typename?: string
  }

  // All available channels
  const topicChannels: TopicChannel[] = (data?.channels ?? [])
    .filter((channel) => channel.__typename === 'TopicChannel')
    .map((c) => c as unknown as TopicChannel)
  const sortByEnabledThenName = (a: TopicChannel, b: TopicChannel) => {
    const aEnabled = a.enabled ?? true
    const bEnabled = b.enabled ?? true
    if (aEnabled && !bEnabled) return -1
    if (!aEnabled && bEnabled) return 1
    const nameA = a.name || ''
    const nameB = b.name || ''
    return nameA.localeCompare(nameB)
  }
  const parentChannels: TopicChannel[] = topicChannels
    .filter((c) => !c.parent)
    .sort(sortByEnabledThenName)
  const childrenByParentId = new Map<string, TopicChannel[]>()
  for (const ch of topicChannels) {
    if (ch.parent) {
      const list = childrenByParentId.get(ch.parent.id) ?? []
      list.push(ch)
      childrenByParentId.set(ch.parent.id, list)
    }
  }
  for (const [, list] of childrenByParentId) {
    list.sort(sortByEnabledThenName)
  }

  // This article's current active channels
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

          const currentChannelIds =
            articleChannels?.map(({ channel }) => channel.id) ?? []
          const unpinChannels = currentChannelIds.filter(
            (channel) => !pinnedChannels.includes(channel)
          )

          await batchPinUnpinChannelArticles({
            variables: {
              pinChannels: pinnedChannels,
              unpinChannels: unpinChannels,
              articles: [article.id],
            },
          })

          toast.info({
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
        {parentChannels.map((parent) => (
          <>
            <List.Item key={parent.id}>
              <Tooltip
                content={'隐藏频道'}
                delay={[500, 0]}
                zIndex={Z_INDEX.OVER_DIALOG}
                disabled={parent.enabled}
                placement={'right'}
              >
                <section className={styles.item}>
                  <Form.SquareCheckBox
                    name="channels"
                    value={parent.id}
                    disabled={
                      !parent.providerId && !values.channels.includes(parent.id)
                    }
                    contents={parent.name || parent.id}
                    contentColor={parent.enabled ? 'black' : 'grey'}
                    checked={values.channels.includes(parent.id)}
                    onChange={() => handleToggleChannel(parent.id)}
                  />
                  {parent.enabled && (
                    <section className={styles.pinnedChannel}>
                      <Form.SquareCheckBox
                        name="pinnedChannels"
                        value={parent.id}
                        contents="置頂"
                        color="greyDarker"
                        checked={values.pinnedChannels.includes(parent.id)}
                        onChange={() => handleTogglePinnedChannel(parent.id)}
                      />
                    </section>
                  )}
                </section>
              </Tooltip>
            </List.Item>
            {(childrenByParentId.get(parent.id) || []).map((child) => (
              <List.Item key={child.id}>
                <section className={`${styles.item} ${styles.child}`}>
                  <Form.SquareCheckBox
                    name="channels"
                    value={child.id}
                    disabled={!child.providerId}
                    contents={child.name || child.id}
                    checked={values.channels.includes(child.id)}
                    onChange={() => handleToggleChannel(child.id)}
                  />
                </section>
              </List.Item>
            ))}
          </>
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
