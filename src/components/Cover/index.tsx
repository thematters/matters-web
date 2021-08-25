import { ResponsiveImage } from '~/components'

import styles from './styles.css'

export interface CoverProps {
  cover?: string | null
  fallbackCover: string
  inEditor?: boolean
}

export const Cover: React.FC<CoverProps> = ({
  cover,
  fallbackCover,
  inEditor,
  children,
}) => {
  const url = cover || fallbackCover
  const isFallback = !cover

  return (
    <div className="cover">
      <ResponsiveImage
        url={url}
        size="540w"
        smUpSize="1080w"
        disabled={isFallback || inEditor}
      />

      {children}

      <style jsx>{styles}</style>
    </div>
  )
}

export default Cover
