import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { UploadEntity } from './Uploader'

import { Asset } from '~/components/GQL/fragments/__generated__/Asset'

const DynamicSetCover = dynamic(() => import('../SetCover'), {
  loading: Spinner,
})

export type BaseSetCoverDialogProps = {
  cover?: string
  assets: Asset[]

  onEdit: (asset?: Asset) => any
  refetchAssets: () => any
  saving?: boolean
} & UploadEntity

type SetCoverDialogProps = BaseSetCoverDialogProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseSetCoverDialog = ({
  cover,
  assets,

  onEdit,
  saving,

  children,

  ...uploadEntity
}: SetCoverDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <DynamicSetCover
          cover={cover}
          onClose={closeDialog}
          onEdit={onEdit}
          assets={assets}
          {...uploadEntity}
        />
      </Dialog>
    </>
  )
}

const SetCoverDialog = (props: SetCoverDialogProps) => (
  <Dialog.Lazy mounted={<BaseSetCoverDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default SetCoverDialog
