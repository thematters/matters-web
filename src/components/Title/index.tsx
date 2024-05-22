import classNames from 'classnames'
import React from 'react'

import styles from './styles.module.css'

type TitleType = 'feed' | 'nav' | 'base'

type TitleIs = 'h1' | 'h2' | 'h3'

type TitleProps = {
  type: TitleType
  is?: TitleIs
}

/**
 * Usage:
 *
 * ```tsx
 * <Title type="article">
 *   <Translate zh_hant='給Matters朋友們的一封信：向星際啟航' />
 * </Title>
 * ```
 */

export const Title: React.FC<React.PropsWithChildren<TitleProps>> = ({
  type,
  is = 'h1',

  children,
}) => {
  const titleClasses = classNames({
    [styles[type]]: true,
  })

  return (
    <>
      {is === 'h1' ? (
        <h1 className={titleClasses}>{children}</h1>
      ) : is === 'h2' ? (
        <h2 className={titleClasses}>{children}</h2>
      ) : (
        <h3 className={titleClasses}>{children}</h3>
      )}
    </>
  )
}
