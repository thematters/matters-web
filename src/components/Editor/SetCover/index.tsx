import { useEffect, useState } from 'react'

import { Dialog, Translate } from '~/components'
import { AssetFragment } from '~/gql/graphql'

import SetCoverDialog from './Dialog'
import Selector from './Selector'
import styles from './styles.module.css'
import Uploader, { UploadEntity } from './Uploader'

export type SetCoverProps = {
  onBack?: () => any
  onClose?: () => any

  cover?: string | null
  assets: AssetFragment[]

  editCover: (asset?: AssetFragment) => any
  refetchAssets: () => any
  coverSaving?: boolean
} & UploadEntity

const SetCover: React.FC<SetCoverProps> & { Dialog: typeof SetCoverDialog } = ({
  onBack,
  onClose,

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

    if (onBack) {
      onBack()
    } else if (onClose) {
      onClose()
    }
  }

  useEffect(() => {
    setSelected(assets.find(filter))
  }, [cover])

  const SubmitButton = () => (
    <Dialog.TextButton
      onClick={onSave}
      text={<Translate id="save" />}
      loading={coverSaving}
    />
  )

  return (
    <>
      <Dialog.Header
        title="setCover"
        closeDialog={onClose}
        leftBtn={
          onBack ? (
            <Dialog.TextButton
              text={<Translate id="back" />}
              onClick={onBack}
            />
          ) : undefined
        }
        rightBtn={<SubmitButton />}
      />

      <Dialog.Content>
        <section className={styles.container}>
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
        </section>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={onBack ? 'back' : 'close'}
              color="greyDarker"
              onClick={onBack || onClose}
            />
            <SubmitButton />
          </>
        }
      />
    </>
  )
}

SetCover.Dialog = SetCoverDialog

export default SetCover
