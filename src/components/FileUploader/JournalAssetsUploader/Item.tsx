import { random } from 'lodash'
import { useEffect, useState } from 'react'

import { ReactComponent as IconCircleTimesFill } from '@/public/static/icons/24px/circle-times-fill.svg'
import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { Spinner } from '~/components/Spinner'

import styles from './styles.module.css'

type ItemProps = {
  file: File
  removeFile: (file: File) => void
}

export const Item = ({ file, removeFile }: ItemProps) => {
  const localSrc = URL.createObjectURL(file)
  const [uploading, setUploading] = useState(true)

  useEffect(() => {
    return () => {
      if (localSrc) {
        URL.revokeObjectURL(localSrc)
      }
    }
  }, [])

  useEffect(() => {
    const ms = random(2, 8, false) * 1000
    setTimeout(() => {
      setUploading(false)
    }, ms)
  }, [])

  return (
    <div className={styles.item}>
      <div className={styles.action}>
        {uploading && <Spinner color="greyDarker" size={24} />}
        {!uploading && (
          <Button
            onClick={() => {
              removeFile(file)
            }}
          >
            <Icon icon={IconCircleTimesFill} color="greyDarker" size={24} />
          </Button>
        )}
      </div>
      <ResponsiveImage
        url={localSrc}
        width={72}
        height={72}
        smUpWidth={72}
        smUpHeight={72}
      />
    </div>
  )
}
