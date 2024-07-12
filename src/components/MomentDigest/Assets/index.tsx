import 'photoswipe/dist/photoswipe.css'

import gql from 'graphql-tag'
import { useEffect, useRef, useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'

import { TEST_ID } from '~/common/enums'
import {
  calculateRenderedImageSize,
  checkImagesLoaded,
  toSizedImageURL,
} from '~/common/utils'
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

const ImagePlaceholder: React.FC = () => (
  <div className={styles.imagePlaceholder} />
)

const Assets = ({ moment }: { moment: MomentDigestAssetsMomentFragment }) => {
  const { assets } = moment
  const [loadedAssets, setLoadedAssets] = useState<LoadedAsset[] | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const width = 106 * 2

  useEffect(() => {
    const calcAssets = async () => {
      if (!ref.current) {
        return
      }

      const images = ref.current.querySelectorAll('img')
      await checkImagesLoaded(images)
      const newAssets = Array.from(images).map((image, index) => {
        const { width, height } = calculateRenderedImageSize(
          window.innerWidth,
          window.innerHeight,
          image.naturalWidth,
          image.naturalHeight
        )
        const asset = assets[index]
        return {
          ...asset,
          width,
          height,
        }
      })
      setLoadedAssets(newAssets)
    }
    calcAssets()
  }, [assets])

  if (!loadedAssets) {
    return (
      <section
        className={styles.assets}
        data-test-id={TEST_ID.MOMENT_DIGEST_ASSETS}
      >
        {assets.map((asset) => (
          <ImagePlaceholder key={asset.id} />
        ))}

        <section className={styles.assetsPlaceholder} ref={ref}>
          {assets.map((asset) => (
            <ResponsiveImage key={asset.id} url={asset.path} width={width} />
          ))}
        </section>
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
              width: width,
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
                <ResponsiveImage url={asset.path} width={width} />
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
