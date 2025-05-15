import { useIntl } from 'react-intl'

import { ReactComponent as IconCircleCheckFill2 } from '@/public/static/icons/24px/circle-check-fill-2.svg'
import { ASSET_TYPE } from '~/common/enums'
import { toSizedImageURL } from '~/common/utils'
import { Icon } from '~/components'
import { AssetFragment } from '~/gql/graphql'

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
    <>
      {imageAssets.map((asset, index) => (
        <div
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
                width: 101,
                height: 101,
              })}
              alt="cover"
            />

            {asset.path === selected?.path && (
              <Icon icon={IconCircleCheckFill2} size={20} />
            )}
          </button>
        </div>
      ))}
    </>
  )
}

export default Selector
