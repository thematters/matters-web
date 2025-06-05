import type { FetchResult } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'
import type { AssetFragment, SetDraftCoverMutation } from '~/gql/graphql'

import SetCoverDialog from './Dialog'
import Selector from './Selector'
import Uploader, { UploadEntity } from './Uploader'

export type SetCoverProps = {
  back?: () => void
  submitCallback?: () => void
  closeDialog?: () => void

  cover?: string | null
  assets: AssetFragment[]

  editCover: (
    asset?: AssetFragment
  ) => Promise<FetchResult<SetDraftCoverMutation> | void>
  refetchAssets: () => void
  coverSaving?: boolean
} & UploadEntity

const SetCover: React.FC<SetCoverProps> & { Dialog: typeof SetCoverDialog } = ({
  back,
  submitCallback,
  closeDialog,

  cover,
  assets,

  editCover,
  coverSaving,

  ...uploadEntity
}) => {
  // cover
  const filter = (ast: AssetFragment) => ast.path === cover
  const [selected, setSelected] = useState(assets.find(filter))
  const onSave = async () => {
    const result = await editCover(selected)

    // set selected cover if fallback cover specified by server
    if (cover && cover === result?.data?.putDraft?.cover && !selected) {
      setSelected(assets.find(filter))
    }

    if (submitCallback) {
      submitCallback()
    } else if (closeDialog) {
      closeDialog()
    }
  }

  useEffect(() => {
    setSelected(assets.find(filter))
  }, [cover])

  const SubmitButton = (
    <Dialog.TextButton
      onClick={onSave}
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={coverSaving}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Set Cover" id="DjIpR6" />}
        closeDialog={closeDialog}
        leftBtn={
          back ? (
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={back}
            />
          ) : undefined
        }
        rightBtn={SubmitButton}
      />

      <Dialog.Content>
        {/* Uploader */}
        <Uploader setSelected={setSelected} {...uploadEntity} />

        {/* Selector */}
        {assets.length > 0 && (
          <Selector
            assets={assets}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                back ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                )
              }
              color="greyDarker"
              onClick={back || closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

SetCover.Dialog = SetCoverDialog

export default SetCover
