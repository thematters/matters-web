import 'photoswipe/dist/photoswipe.css'

import gql from 'graphql-tag'
import { useEffect, useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'

import { TEST_ID } from '~/common/enums'
import { toSizedImageURL } from '~/common/utils'
import { getImageDimensions } from '~/common/utils/form'
import { ResponsiveImage } from '~/components'
import { MomentDigestAssetsMomentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  moment: gql`
    fragment MomentDigestAssetsMoment on Moment {
      assets {
        id
        path
      }
    }
  `,
}

type LoadedAsset = {
  __typename?: 'Asset' | undefined
  id: string
  path: string
  width: number
  height: number
}

const ImagePlaceholder = () => <div className={styles.imagePlaceholder} />

const Assets = ({ moment }: { moment: MomentDigestAssetsMomentFragment }) => {
  const { assets } = moment
  const [loadedAssets, setLoadedAssets] = useState<LoadedAsset[] | null>(null)
  useEffect(() => {
    const loadAssets = async () => {
      const newAssets = await Promise.all(
        assets.map(async (asset) => {
          const { width, height } = await getImageDimensions(asset.path)
          return {
            ...asset,
            width,
            height,
          }
        })
      )
      setLoadedAssets(newAssets)
    }
    loadAssets()
  }, [assets])
  if (!loadedAssets) {
    return (
      <section className={styles.assets}>
        {assets.map((asset) => (
          <ImagePlaceholder key={asset.id} />
        ))}
      </section>
    )
  }

  return (
    <section
      className={styles.assets}
      data-test-id={TEST_ID.MOMENT_DIGEST_ASSETS}
    >
      <Gallery options={{}}>
        {loadedAssets.map((asset) => (
          <Item
            key={asset.id}
            original={asset.path}
            thumbnail={toSizedImageURL({
              url: asset.path,
              width: 106,
              disableAnimation: true,
            })}
            width={asset.width}
            height={asset.height}
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className={styles.item}
                key={asset.id}
                role="button"
              >
                <ResponsiveImage url={asset.path} width={106} height={106} />
              </div>
            )}
          </Item>
        ))}
      </Gallery>
    </section>
  )
}

Assets.fragments = fragments

export default Assets
