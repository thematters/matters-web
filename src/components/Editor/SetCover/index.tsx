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

  return (
    <>
      <Dialog.Header
        title="setCover"
        closeDialog={onClose}
        leftButton={
          onBack ? <Dialog.Header.BackButton onClick={onBack} /> : undefined
        }
        rightButton={
          <Dialog.Header.RightButton
            onClick={onSave}
            text={<Translate id="save" />}
            loading={coverSaving}
          />
        }
      />

      <Dialog.Content hasGrow>
        <section className={styles['container']}>
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
    </>
  )
}

SetCover.Dialog = SetCoverDialog

export default SetCover
