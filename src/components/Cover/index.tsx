import classNames from 'classnames'

import { ResponsiveImage } from '~/components'

import styles from './styles.css'

export interface CoverProps {
  cover?: string | null
  fallbackCover: string
  inEditor?: boolean
  type?: 'user' | 'circle' | 'tag'
}

export const Cover: React.FC<CoverProps> = ({
  cover,
  fallbackCover,
  inEditor,
  type,
  children,
}) => {
  const url = cover || fallbackCover
  const isFallback = !cover

  const coverClasses = classNames({
    cover: true,
    [`${type}`]: !!type,
  })

  return (
    <div className={coverClasses}>
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
