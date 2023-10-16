import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'
import { SearchSelectFormProps } from '~/components/Forms/SearchSelectForm'
import { SelectNode } from '~/components/SearchSelect/SearchingArea'

type SearchSelectDialogProps = Omit<SearchSelectFormProps, 'closeDialog'> & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicSearchSelectForm = dynamic(
  () => import('~/components/Forms/SearchSelectForm'),
  { loading: Spinner }
)

const BaseSearchSelectDialog = ({
  children,
  ...props
}: SearchSelectDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicSearchSelectForm
          {...props}
          onSave={async (nodes: SelectNode[]) => {
            await props.onSave(nodes)
            closeDialog()
          }}
          closeDialog={closeDialog}
        />
      </Dialog>
    </>
  )
}

export const SearchSelectDialog = (props: SearchSelectDialogProps) => (
  <Dialog.Lazy mounted={<BaseSearchSelectDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
