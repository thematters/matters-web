import { useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  Form,
  Spinner,
  toast,
  useDialogSwitch,
  useMutation,
} from '~/components'
import { TOGGLE_PIN_CHANNEL_ARTICLES } from '~/components/GQL/mutations/togglePinChannelArticles'
import {
  GetArticleTopicChannelsQuery,
  SetArticleTopicChannelsMutation,
  TogglePinChannelArticlesMutation,
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

  const [togglePinChannelArticles] =
    useMutation<TogglePinChannelArticlesMutation>(
      TOGGLE_PIN_CHANNEL_ARTICLES,
      undefined,
      { showToast: true }
    )

  const formId = 'set-article-channels-form'

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

          await togglePinChannelArticles({
            variables: {
              channels: pinnedChannels,
              articles: [article.id],
              pinned: true,
            },
          })

          toast.success({
            message: '分類已修正',
          })

          setSubmitting(false)
          closeDialog()
        } catch (error) {
          toast.error({ message: '分類修正失敗' })
          setSubmitting(false)
        }
      },
    })

  const handleToggleChannel = (channelId: string) => {
    const currentChannels = [...values.channels]
    const index = currentChannels.indexOf(channelId)

    if (index >= 0) {
      currentChannels.splice(index, 1)
    } else {
      currentChannels.push(channelId)
    }

    setFieldValue('channels', currentChannels)
  }

  const handleTogglePinnedChannel = (channelId: string) => {
    const currentPinnedChannels = [...values.pinnedChannels]
    const index = currentPinnedChannels.indexOf(channelId)

    if (index >= 0) {
      currentPinnedChannels.splice(index, 1)
    } else {
      currentPinnedChannels.push(channelId)
    }

    setFieldValue('pinnedChannels', currentPinnedChannels)
  }

  const allChannels = data?.channels.filter(
    (channel) => 'enabled' in channel && channel.enabled
  )
  const articleChannels = data?.article?.oss.topicChannels.filter(
    (channel) => channel.enabled
  )

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      {allChannels?.map((channel) => (
        <section key={channel.id} className={styles.item}>
          <Form.SquareCheckBox
            name="channels"
            value={channel.id}
            contents={'name' in channel ? channel.name : channel.id}
            checked={values.channels.includes(channel.id)}
            onChange={() => handleToggleChannel(channel.id)}
          />
          <section className={styles.pinnedChannel}>
            <Form.SquareCheckBox
              name="pinnedChannels"
              value={channel.id}
              contents={'置頂'}
              color="greyDarker"
              checked={values.pinnedChannels.includes(channel.id)}
              onChange={() => handleTogglePinnedChannel(channel.id)}
            />
          </section>
        </section>
      ))}
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
          title="頻道管理"
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
