import { random } from 'lodash'
import { memo, useEffect, useState } from 'react'

import { ReactComponent as IconCircleTimesFill } from '@/public/static/icons/24px/circle-times-fill.svg'
import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { Spinner } from '~/components/Spinner'

import { JournalAsset } from '.'
import styles from './styles.module.css'

type ItemProps = {
  asset: JournalAsset
  removeAsset: (asset: JournalAsset) => void
}

export const Item = memo(function Item({ asset, removeAsset }: ItemProps) {
  const [uploading, setUploading] = useState(!asset.uploaded)

  useEffect(() => {
    if (!asset.uploaded) {
      const ms = random(2, 5, false) * 1000
      // mock uploading
      setTimeout(() => {
        setUploading(false)
        asset.uploaded = true
      }, ms)
    }
  }, [])

  return (
    <div className={styles.item}>
      <div className={styles.action}>
        {uploading && <Spinner color="greyDarker" size={24} />}
        {!uploading && (
          <Button
            onClick={() => {
              removeAsset(asset)
            }}
          >
            <Icon icon={IconCircleTimesFill} color="greyDarker" size={24} />
          </Button>
        )}
      </div>
      <ResponsiveImage
        url={asset.src}
        // url={
        //   'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/embed/c768fc54-92d3-4aea-808e-a668b903fc62.png/w=212,h=212,fit=crop,anim=false'
        // }
        width={72}
        height={72}
        smUpWidth={72}
        smUpHeight={72}
      />
    </div>
  )
})
