import { Dialog, Translate, useDialogSwitch, useMutation } from '~/components'

import { ADD_TOAST } from '~/common/enums'

import { DELETE_CHAPTER, fragments } from './gql'

import { DeleteChapter } from './__generated__/DeleteChapter'
import { DeleteChapterDialogChapter } from './__generated__/DeleteChapterDialogChapter'

interface DeleteChapterDialogProps {
  chapter: DeleteChapterDialogChapter
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DeleteChapterDialog = ({
  chapter,
  children,
}: DeleteChapterDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const topicId = chapter.topic.id
  const newChapterIds = (chapter.topic.chapters || []).filter(
    (c) => c.id !== chapter.id
  )
  const [deleteChapter] = useMutation<DeleteChapter>(DELETE_CHAPTER, {
    variables: { id: topicId, chapters: newChapterIds },
  })

  const onDelete = async () => {
    await deleteChapter()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="章節已刪除"
              zh_hans="章节已删除"
              en="Topics deleted"
            />
          ),
        },
      })
    )
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title="deleteChapter"
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="確認刪除章節，章節會馬上消失。"
              zh_hans="确认删除章节，章节会马上消失。"
              en="Confirm chapter deletion"
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

const LazyDeleteChapterDialog = (props: DeleteChapterDialogProps) => (
  <Dialog.Lazy mounted={<DeleteChapterDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

LazyDeleteChapterDialog.fragments = fragments

export default LazyDeleteChapterDialog
