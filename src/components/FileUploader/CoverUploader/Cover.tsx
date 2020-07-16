import { Img } from '~/components'

import styles from './styles.css'

export interface CoverProps {
  coverUrl?: string
  defaultCoverUrl: string
  inEditor?: boolean
}

export const Cover = ({
  coverUrl,
  defaultCoverUrl,
  inEditor,
}: CoverProps) => {
  const url = coverUrl || defaultCoverUrl
  const isFallback = !url

  return (
    <div className="cover">
      <Img
        url={url}
        size="1080w"
        smUpSize="540w"
        disabled={isFallback || inEditor}
      />

      <style jsx>{styles}</style>
    </div>
  )
}

export default Cover
