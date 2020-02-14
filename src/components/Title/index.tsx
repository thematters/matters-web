import classNames from 'classnames'
import React from 'react'

import styles from './styles.css'

type TitleType = 'article' | 'feed' | 'dialog-headline' | 'sidebar' | 'nav'

type TitleIs = 'h1' | 'h2' | 'h3'

interface TitleProps {
  type: TitleType
  is?: TitleIs
  className?: string
  style?: React.CSSProperties
}

/**
 * Usage:
 *
 * ```tsx
 * <Title type="page">
 *   <Translate zh_hant='給Matters朋友們的一封信：向星際啟航' />
 * </Title>
 * ```
 */

export const Title: React.FC<TitleProps> = ({
  type,
  is = 'h1',
  style,
  className,
  children
}) => {
  const titleClasses = classNames({
    [type]: true,
    [className || '']: !!className
  })

  return (
    <>
      {is === 'h1' ? (
        <h1 className={titleClasses} style={style}>
          {children}
        </h1>
      ) : is === 'h2' ? (
        <h2 className={titleClasses} style={style}>
          {children}
        </h2>
      ) : (
        <h3 className={titleClasses} style={style}>
          {children}
        </h3>
      )}

      <style jsx>{styles}</style>
    </>
  )
}
