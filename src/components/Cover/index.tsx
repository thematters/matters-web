import { Img } from '~/components'

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
      <Img
        url={url}
        size="1080w"
        smUpSize="540w"
        disabled={isFallback || inEditor}
      />

      {children}

      <style jsx>{styles}</style>
    </div>
  )
}

export default Cover
