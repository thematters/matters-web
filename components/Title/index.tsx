import classNames from 'classnames'
import React from 'react'

import styles from './styles.css'

type TitleType = 'feature' | 'article' | 'page' | 'feed' | 'modal'
type TitleIs = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface TitleProps {
  type: TitleType
  is?: TitleIs
  className?: string
}

/**
 * Usage:
 *
 * ```tsx
 * <Title type="page">
 *   <Translate
 *     translations={{ zh_hant: '給Matters朋友們的一封信：向星際啟航' }}
 *   />
 * </Title>
 * ```
 */

export const Title: React.SFC<TitleProps> = ({
  type,
  is = 'h1',

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
        <h1 className={titleClasses}>{children}</h1>
      ) : is === 'h2' ? (
        <h2 className={titleClasses}>{children}</h2>
      ) : is === 'h3' ? (
        <h3 className={titleClasses}>{children}</h3>
      ) : is === 'p' ? (
        <p className={titleClasses}>{children}</p>
      ) : (
        <span className={titleClasses}>{children}</span>
      )}
      <style jsx>{styles}</style>
    </>
  )
}
