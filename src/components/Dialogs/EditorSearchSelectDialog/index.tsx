import dynamic from 'next/dynamic'

import { Dialog, DialogProps, Spinner, useDialogSwitch } from '~/components'
import { EditorSearchSelectFormProps } from '~/components/Forms/EditorSearchSelectForm'
import { SelectNode } from '~/components/SearchSelect/SearchingArea'

type EditorSearchSelectDialogProps = Omit<
  EditorSearchSelectFormProps,
  'closeDialog'
> & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & Pick<DialogProps, 'size'>

const DynamicEditorSearchSelectForm = dynamic(
  () => import('~/components/Forms/EditorSearchSelectForm'),
  { loading: Spinner }
)

const BaseSearchSelectDialog = ({
  children,
  size,
  ...props
}: EditorSearchSelectDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight size={size}>
        <DynamicEditorSearchSelectForm
          {...props}
          onSave={async (nodes: SelectNode[]) => {
            await props.onSave(nodes)
          }}
          closeDialog={closeDialog}
        />
      </Dialog>
    </>
  )
}

export const EditorSearchSelectDialog = (
  props: EditorSearchSelectDialogProps
) => (
  <Dialog.Lazy mounted={<BaseSearchSelectDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
