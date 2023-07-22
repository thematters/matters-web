import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, Translate } from '~/components'
import { AssetFragment } from '~/gql/graphql'

import SetCoverDialog from './Dialog'
import Selector from './Selector'
import Uploader, { UploadEntity } from './Uploader'

export type SetCoverProps = {
  back?: () => any
  submitCallback?: () => any
  closeDialog?: () => any

  cover?: string | null
  assets: AssetFragment[]

  editCover: (asset?: AssetFragment) => any
  refetchAssets: () => any
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
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={coverSaving}
    />
  )

  return (
    <>
      <Dialog.Header
        title="setCover"
        closeDialog={closeDialog}
        leftBtn={
          back ? (
            <Dialog.TextButton text={<Translate id="back" />} onClick={back} />
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
                back ? 'back' : <FormattedMessage defaultMessage="Cancel" />
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
