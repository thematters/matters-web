import classNames from 'classnames'
import React from 'react'

import styles from './styles.module.css'

type TitleType = 'article' | 'feed' | 'sidebar' | 'nav' | 'tag'

type TitleIs = 'h1' | 'h2' | 'h3'

type TitleProps = {
  type: TitleType
  is?: TitleIs
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

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

  children,

  ...props
}) => {
  const titleClasses = classNames({
    [styles[type]]: true,
    [styles.clickable]: !!props.onClick,
  })

  return (
    <>
      {is === 'h1' ? (
        <h1 className={titleClasses} {...props}>
          {children}
        </h1>
      ) : is === 'h2' ? (
        <h2 className={titleClasses} {...props}>
          {children}
        </h2>
      ) : (
        <h3 className={titleClasses} {...props}>
          {children}
        </h3>
      )}
    </>
  )
}
