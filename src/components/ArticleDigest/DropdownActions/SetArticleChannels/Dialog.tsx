import { useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import { useEffect, useId } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  Form,
  Spinner,
  toast,
  useDialogSwitch,
  useMutation,
} from '~/components'
import {
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
    }
  )
  const [setArticleChannels] = useMutation<SetArticleTopicChannelsMutation>(
    SET_ARTICLE_TOPIC_CHANNELS,
    undefined,
    { showToast: true }
  )

  const formId = useId()

  const { values, handleSubmit, isSubmitting, setFieldValue } =
    useFormik<FormValues>({
      initialValues: { channels: [] },
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async ({ channels }, { setSubmitting }) => {
        try {
          await setArticleChannels({
            variables: { id: article.id, channels },
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
    const index = currentChannels.indexOf(channelId)

    if (index >= 0) {
      currentChannels.splice(index, 1)
    } else {
      currentChannels.push(channelId)
    }

    setFieldValue('channels', currentChannels)
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
  }, [articleChannels?.join(',')])

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title="修正分類"
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
