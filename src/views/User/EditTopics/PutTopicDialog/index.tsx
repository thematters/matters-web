import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { fragments } from './gql'

import { PutTopicDialogTopic } from './__generated__/PutTopicDialogTopic'

interface PutTopicDialogProps {
  topic?: PutTopicDialogTopic
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BasePutTopicDialog = ({ topic, children }: PutTopicDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <DynamicContent topic={topic} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

const PutTopicDialog = (props: PutTopicDialogProps) => (
  <Dialog.Lazy mounted={<BasePutTopicDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

PutTopicDialog.fragments = fragments

export default PutTopicDialog
