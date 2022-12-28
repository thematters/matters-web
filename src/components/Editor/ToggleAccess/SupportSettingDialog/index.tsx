import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { ArticleDetailPublic_article } from '~/views/ArticleDetail/__generated__/ArticleDetailPublic'
import { EditMetaDraft } from '~/views/Me/DraftDetail/__generated__/EditMetaDraft'

interface SupportSettingDialogProps {
  article?: ArticleDetailPublic_article
  draft?: EditMetaDraft
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

      <Dialog size="lg" isOpen={show} onDismiss={closeDialog}>
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
