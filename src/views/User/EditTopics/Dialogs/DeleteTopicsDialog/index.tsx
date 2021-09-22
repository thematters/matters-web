import {
  Dialog,
  Translate,
  useDialogSwitch,
  useMutation,
  useRoute,
} from '~/components'
import DELETE_TOPICS from '~/components/GQL/mutations/deleteTopics'

import { ADD_TOAST } from '~/common/enums'
import { toPath } from '~/common/utils'

import { DeleteTopics } from '~/components/GQL/mutations/__generated__/DeleteTopics'

interface DeleteTopicDialogProps {
  topicIds: string[]
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteTopicDialog = ({ topicIds, children }: DeleteTopicDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const { router, getQuery } = useRoute()
  const userName = getQuery('name')

  const [deleteTopics] = useMutation<DeleteTopics>(DELETE_TOPICS, {
    variables: { ids: topicIds },
  })

  const onDelete = async () => {
    await deleteTopics()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="主題已刪除"
              zh_hans="主题已删除"
              en="Topics deleted"
            />
          ),
        },
      })
    )

    const path = toPath({
      page: 'userEditTopics',
      userName,
    })
    router.push(path.href)
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title="deleteTopic"
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="確認刪除主題，主題會馬上消失。"
              zh_hans="确认删除主题，主题会马上消失。"
              en="Confirm topic deletion"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onDelete()
              closeDialog()
            }}
          >
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyDeleteTopicDialog = (props: DeleteTopicDialogProps) => (
  <Dialog.Lazy mounted={<DeleteTopicDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyDeleteTopicDialog
