import { useEffect, useState } from 'react'

import { Dialog, Translate } from '~/components'

import Selector from './Selector'
import styles from './styles.css'
import Uploader, { UploadEntity } from './Uploader'

import { Asset } from '~/components/GQL/fragments/__generated__/Asset'

export type SetCoverProps = {
  onBack: () => any

  cover?: string
  assets: Asset[]

  onEdit: (asset?: Asset) => any
  refetchAssets: () => any
  saving?: boolean
} & UploadEntity

const SetCover = ({
  onBack,

  cover,
  assets,

  onEdit,
  saving,

  ...uploadEntity
}: SetCoverProps) => {
  // cover
  const filter = (ast: Asset) => ast.path === cover
  const [selected, setSelected] = useState(assets.find(filter))
  const onSave = async () => {
    const result = await onEdit(selected)
    // set selected cover if fallback cover specified by server
    if (cover && cover === result.data?.putDraft?.cover && !selected) {
      setSelected(assets.find(filter))
    }
    onBack()
  }

  useEffect(() => {
    setSelected(assets.find(filter))
  }, [cover])

  return (
    <>
      <Dialog.Header
        title="setCover"
        leftButton={<Dialog.Header.BackButton onClick={onBack} />}
        rightButton={
          <Dialog.Header.RightButton
            onClick={onSave}
            text={<Translate id="save" />}
            loading={saving}
          />
        }
      />

      <Dialog.Content hasGrow>
        <section className="container">
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

          <style jsx>{styles}</style>
        </section>
      </Dialog.Content>
    </>
  )
}

export default SetCover
