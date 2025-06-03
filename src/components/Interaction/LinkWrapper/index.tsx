import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

export interface LinkWrapperProps {
  href: string

  textActiveColor?: 'green'

  disabled?: boolean
  onClick?: () => void

  testId?: TEST_ID

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/**
 * LinkWrapper is a component for wrapping children with a link.
 * It supports all the functionality of both the original LinkWrapper and RouteLink.
 *
 * Usage:
 *
 * <LinkWrapper href="/path">Link Content</LinkWrapper>
 *
 * // With additional props like className
 * <LinkWrapper href="/path" className="custom-class">Link Content</LinkWrapper>
 *
 * // With onClick handler
 * <LinkWrapper href="/path" onClick={() => console.log('clicked')}>Link Content</LinkWrapper>
 *
 * // Disabled link (renders children without link)
 * <LinkWrapper href="/path" disabled>Link Content</LinkWrapper>
 */
export const LinkWrapper = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<LinkWrapperProps>
>(
  (
    {
      href,
      textActiveColor,
      disabled,
      onClick,
      testId,
      children,
      ...restProps
    },
    ref
  ) => {
    if (disabled) {
      return <>{children}</>
    }

    const linkClasses = classNames({
      [styles.wrapper]: true,
      [textActiveColor
        ? styles[`textActive${capitalizeFirstLetter(textActiveColor)}`]
        : '']: !!textActiveColor,
      [restProps.className || '']: !!restProps.className,
    })

    // Remove className from restProps as we've already applied it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, ...otherProps } = restProps

    return (
      <Link
        href={href}
        ref={ref}
        className={linkClasses}
        onClick={(e) => {
          if (onClick) {
            onClick()
            e.stopPropagation()
          }
        }}
        {...(testId ? { ['data-test-id']: testId } : {})}
        {...otherProps}
      >
        {children}
      </Link>
    )
  }
)

LinkWrapper.displayName = 'LinkWrapper'
