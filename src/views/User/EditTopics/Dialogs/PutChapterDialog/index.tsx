import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { fragments } from './gql'

import { PutChapterDialogChapter } from './__generated__/PutChapterDialogChapter'

interface PutChapterDialogProps {
  topicId: string
  chapter?: PutChapterDialogChapter
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BasePutChapterDialog = ({
  topicId,
  chapter,
  children,
}: PutChapterDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <DynamicContent
          topicId={topicId}
          chapter={chapter}
          closeDialog={closeDialog}
        />
      </Dialog>
    </>
  )
}

const PutChapterDialog = (props: PutChapterDialogProps) => (
  <Dialog.Lazy mounted={<BasePutChapterDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

PutChapterDialog.fragments = fragments

export default PutChapterDialog
