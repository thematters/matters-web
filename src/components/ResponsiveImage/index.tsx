import classNames from 'classnames'
import React, { useState } from 'react'

import { TEST_ID } from '~/common/enums'
import {
  capitalizeFirstLetter,
  toSizedImageURL,
  ToSizedImageURLSize,
} from '~/common/utils'

import styles from './styles.module.css'

/**
 * Responsive Image
 */

interface ResponsiveImageProps {
  url: string
  width: ToSizedImageURLSize
  height?: ToSizedImageURLSize
  smUpWidth?: ToSizedImageURLSize
  smUpHeight?: ToSizedImageURLSize
  disabled?: boolean
  loading?: 'eager' | 'lazy'
  anonymous?: boolean
  disableAnimation?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
  objectFix?: 'cover'
}

const BaseResponsiveImage = ({
  url,
  width,
  smUpWidth,
  height,
  smUpHeight,
  disabled,
  loading,
  anonymous,
  disableAnimation,
  fetchPriority,
  objectFix,
}: ResponsiveImageProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // eg: https://.../images/prod/avatar/b1bea2ab-112a-4cb9-8fa1-2703113751cc.gif/public
  const isGIF = /gif(\/|$)/i.test(url)
  if (isGIF && !disableAnimation) {
    // override some fetch policy for animated GIF, work around some cloudflare images GIF re-sizing problems
    loading = 'lazy'
    fetchPriority = 'low'
  }

  // Fallback to the raw `url` if manually disable or responsive image is failed to load
  if (disabled || error) {
    return (
      <img src={url} loading={loading} fetchPriority={fetchPriority} alt="" />
    )
  }

  const imageClasses = classNames({
    [styles[`objectFix${capitalizeFirstLetter(objectFix || '')}`]]: !!objectFix,
  })

  return (
    <picture
      onError={() => setError(true)}
      data-test-id={TEST_ID.RESPONSIVE_IMG}
    >
      {smUpWidth && (
        <source
          media="(min-width: 475px)"
          srcSet={toSizedImageURL({
            url,
            width: smUpWidth,
            height: smUpHeight,
            disableAnimation,
          })}
        />
      )}

      <source
        srcSet={toSizedImageURL({
          url,
          width,
          height,
          disableAnimation,
        })}
      />

      <img
        className={imageClasses}
        src={url}
        srcSet={toSizedImageURL({
          url,
          width,
          height,
          disableAnimation: !loaded || disableAnimation, // use true until loaded
        })}
        loading={loading}
        alt=""
        crossOrigin={anonymous ? 'anonymous' : undefined}
        fetchPriority={fetchPriority}
        onLoad={() => {
          // console.log(`img onload:`)
          // this.srcSet = toSizedImageURL({ url, width, height, disableAnimation })
          setLoaded(true)
        }}
      />
    </picture>
  )
}

/**
 * Memoizing
 */
type MemoizedResponsiveImage = React.MemoExoticComponent<
  React.FC<ResponsiveImageProps>
>

export const ResponsiveImage = React.memo(
  BaseResponsiveImage,
  (prevProps, props) => {
    return (
      prevProps.url === props.url &&
      prevProps.width === props.width &&
      prevProps.height === props.height &&
      prevProps.smUpWidth === props.smUpWidth &&
      prevProps.smUpHeight === props.smUpHeight &&
      prevProps.disabled === props.disabled &&
      prevProps.disableAnimation === props.disableAnimation &&
      prevProps.fetchPriority === props.fetchPriority
    )
  }
) as MemoizedResponsiveImage
