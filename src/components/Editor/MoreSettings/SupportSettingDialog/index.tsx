import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'
import { EditMetaDraftFragment } from '~/gql/graphql'

interface SupportSettingDialogProps {
  article?: {
    replyToDonator?: string | null
    requestForDonation?: string | null
  }
  draft?: EditMetaDraftFragment
  editSupportSetting: (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) => void
  supportSettingSaving: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseSupportSettingDialog = ({
  children,
  draft,
  article,
  editSupportSetting,
  supportSettingSaving,
}: SupportSettingDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnClickOutside={false}
        dismissOnESC={false}
      >
        <DynamicContent
          closeDialog={closeDialog}
          draft={draft}
          article={article}
          editSupportSetting={editSupportSetting}
          supportSettingSaving={supportSettingSaving}
        />
      </Dialog>
    </>
  )
}

const SupportSettingDialog = (props: SupportSettingDialogProps) => (
  <Dialog.Lazy mounted={<BaseSupportSettingDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default SupportSettingDialog
