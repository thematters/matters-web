import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'
import { ArticleDetailPublicQuery, EditMetaDraftFragment } from '~/gql/graphql'

interface SupportSettingDialogProps {
  article?: ArticleDetailPublicQuery['article']
  draft?: EditMetaDraftFragment
  editSupportSetting: (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) => any
  supportSettingSaving: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

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

      <Dialog isOpen={show} onDismiss={closeDialog}>
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
