import type { FetchResult } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ASSET_TYPE } from '~/common/enums'
import { Dialog, Media } from '~/components'
import { AssetFragment, AssetType, SetDraftCoverMutation } from '~/gql/graphql'

import SetCoverDialog from './Dialog'
import Item from './Item'
import styles from './styles.module.css'
import Uploader, { UploadEntity } from './Uploader'
export type EditorAsset = {
  file?: File
  draftId?: string
} & AssetFragment

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
  assets: _assets,

  editCover,
  coverSaving,

  ...uploadEntity
}) => {
  const [assets, setAssets] = useState<EditorAsset[]>(
    _assets
      .filter(
        (asset) =>
          [ASSET_TYPE.embed, ASSET_TYPE.cover].indexOf(
            asset.type as unknown as ASSET_TYPE
          ) >= 0
      )
      .reverse()
  )

  const addAssets = (files: File[]) => {
    const newAssets = files.map((file) => ({
      file,
      id: '',
      draftId: crypto.randomUUID(),
      type: ASSET_TYPE.cover as unknown as AssetType,
      path: URL.createObjectURL(file),
      draft: true,
    }))
    setAssets([...newAssets, ...assets])
  }

  const updateAsset = (asset: EditorAsset) => {
    setAssets(assets.map((a) => (a.draftId === asset.draftId ? asset : a)))
  }

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
        hasSmUpTitle={false}
      />

      <Dialog.Content>
        <Media greaterThan="sm">
          <section className={styles.header}>
            <section className={styles.title}>
              <FormattedMessage defaultMessage="Set Cover" id="DjIpR6" />
            </section>
            <section className={styles.text}>
              <FormattedMessage
                defaultMessage="Select or upload a square image ( > 120×120px )"
                id="ZgRE5H"
              />
            </section>
          </section>
        </Media>

        <section className={styles.content}>
          <Uploader addAssets={addAssets} />

          {assets.map((asset) => (
            <Item
              key={asset.id || asset.draftId}
              asset={asset}
              selected={selected}
              setSelected={setSelected}
              updateAsset={updateAsset}
              {...uploadEntity}
            />
          ))}
        </section>
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
