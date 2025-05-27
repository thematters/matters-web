import { useIntl } from 'react-intl'

import IconCircleCheckFill2 from '@/public/static/icons/24px/circle-check-fill-2.svg'
import { ASSET_TYPE } from '~/common/enums'
import { toSizedImageURL } from '~/common/utils'
import { Icon, Translate } from '~/components'
import { AssetFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface SelectorProps {
  assets: AssetFragment[]
  selected?: AssetFragment
  setSelected: (asset?: AssetFragment) => any
}

const Selector: React.FC<SelectorProps> = ({
  assets,
  selected,
  setSelected,
}) => {
  const intl = useIntl()

  const imageAssets = assets.filter(
    (asset) =>
      [ASSET_TYPE.embed, ASSET_TYPE.cover].indexOf(asset.type as any) >= 0
  )

  return (
    <section className={styles.selector}>
      <h3>
        <Translate
          zh_hant="你也可以選擇一張已有的圖片作為封面"
          zh_hans="你也可以选择一张已有的图片作为封面"
          en="you can choose an existing picture as cover"
        />
      </h3>

      <ul>
        {imageAssets.map((asset, index) => (
          <li
            key={asset.id}
            className={asset.path === selected?.path ? 'selected' : undefined}
          >
            <button
              type="button"
              onClick={() =>
                setSelected(asset.id === selected?.id ? undefined : asset)
              }
              aria-label={intl.formatMessage({
                defaultMessage: `Set as cover`,
                id: 'BNupBu',
              })}
            >
              <img
                src={toSizedImageURL({
                  url: asset.path,
                  width: 72,
                  height: 72,
                })}
                alt="cover"
              />

              {asset.path === selected?.path && (
                <Icon icon={IconCircleCheckFill2} size={24} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Selector
