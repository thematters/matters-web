import { useState } from 'react'

import { Dialog, IconCheckedWithBorderMedium, Translate } from '~/components'

import styles from './styles.css'

import { Asset } from '~/components/GQL/fragments/__generated__/Asset'

interface SetCoverDialogProps {
  cover: string
  assets: Asset[]

  onSave: (asset: Asset) => Promise<any>
  saving?: boolean

  children: ({ open }: { open: () => void }) => React.ReactNode
}

const SetCoverDialog = ({
  cover,
  assets,

  onSave,
  saving,

  children,
}: SetCoverDialogProps) => {
  // dialog
  const [showDialog, setShowDialog] = useState(true)
  const open = () => {
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  // cover
  const [selected, setSelected] = useState(
    assets.find((ast) => ast.path === cover)
  )
  const onClickSave = async () => {
    if (!selected) {
      return
    }

    await onSave(selected)
    close()
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="setCover"
          close={close}
          closeTextId="close"
          rightButton={
            <Dialog.Header.RightButton
              onClick={onClickSave}
              text={<Translate id="save" />}
              loading={saving}
            />
          }
        />

        <section className="container">
          {assets.length > 0 && (
            <section className="selector">
              <h3>
                <Translate
                  zh_hant="你也可以選擇一張已有的圖片作為封面"
                  zh_hans="你也可以选择一张已有的图片作为封面"
                />
              </h3>

              <ul>
                {assets.map((asset, index) => (
                  <li
                    key={asset.id}
                    className={
                      asset.path === selected?.path ? 'selected' : undefined
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(asset)}
                      aria-label={`設置第 ${index + 1} 張圖片為封面`}
                    >
                      <img src={asset.path} />

                      {asset.path === selected?.path && (
                        <IconCheckedWithBorderMedium size="md" color="green" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <style jsx>{styles}</style>
        </section>
      </Dialog>
    </>
  )
}

export default (props: SetCoverDialogProps) => (
  <Dialog.Lazy mounted={<SetCoverDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
