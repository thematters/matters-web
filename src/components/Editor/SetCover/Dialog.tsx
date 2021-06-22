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

  editCover: (asset?: Asset) => any
  refetchAssets: () => any
  coverSaving?: boolean
} & UploadEntity

type SetCoverDialogProps = BaseSetCoverDialogProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseSetCoverDialog = ({
  cover,
  assets,

  editCover,
  coverSaving,

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
          editCover={editCover}
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
