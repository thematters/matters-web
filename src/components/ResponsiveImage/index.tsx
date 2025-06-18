import React, { useState } from 'react'

import { TEST_ID } from '~/common/enums'
import { toSizedImageURL, ToSizedImageURLSize } from '~/common/utils'

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
  enableAnimation?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
}

const BaseResponsiveImage = ({
  url,
  width,
  smUpWidth,
  height,
  smUpHeight,
  disabled,
  loading,
  enableAnimation,
  fetchPriority,
}: ResponsiveImageProps) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // eg: https://.../images/prod/avatar/b1bea2ab-112a-4cb9-8fa1-2703113751cc.gif/public
  const isGIF = /gif(\/|$)/i.test(url)
  if (isGIF && enableAnimation) {
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
            enableAnimation,
          })}
        />
      )}

      <source
        srcSet={toSizedImageURL({
          url,
          width,
          height,
          enableAnimation,
        })}
      />

      <img
        src={url}
        srcSet={toSizedImageURL({
          url,
          width,
          height,
          enableAnimation: !loaded || !enableAnimation, // use true until loaded
        })}
        loading={loading}
        fetchPriority={fetchPriority}
        alt=""
        onLoad={() => {
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
      prevProps.enableAnimation === props.enableAnimation &&
      prevProps.fetchPriority === props.fetchPriority
    )
  }
) as MemoizedResponsiveImage
