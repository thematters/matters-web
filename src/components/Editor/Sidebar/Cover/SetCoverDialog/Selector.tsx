import { IconCheckedWithBorderMedium, Translate } from '~/components'

import styles from './styles.css'

import { Asset } from '~/components/GQL/fragments/__generated__/Asset'

interface SelectorProps {
  assets: Asset[]
  selected?: Asset
  setSelected: (asset: Asset) => any
}

const Selector: React.FC<SelectorProps> = ({
  assets,
  selected,
  setSelected,
}) => (
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
          className={asset.path === selected?.path ? 'selected' : undefined}
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

    <style jsx>{styles}</style>
  </section>
)

export default Selector
