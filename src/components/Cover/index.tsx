import { ResponsiveImage } from '~/components'

import styles from './styles.module.css'

export interface CoverProps {
  cover?: string | null
  fallbackCover: string
  inEditor?: boolean
}

export const Cover: React.FC<React.PropsWithChildren<CoverProps>> = ({
  cover,
  fallbackCover,
  inEditor,
  children,
}) => {
  const url = cover || fallbackCover
  const isFallback = !cover

  return (
    <div className={styles.cover}>
      <ResponsiveImage
        url={url}
        width={1376}
        disabled={isFallback || inEditor}
      />

      {children}
    </div>
  )
}

export default Cover
