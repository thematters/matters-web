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
  anonymous?: boolean
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
}: ResponsiveImageProps) => {
  const [error, setError] = useState(false)

  // const isGIF = /gif/i.test(url)

  // Fallback to the raw `url` if manually disable or responsive image is failed to load
  if (disabled || error) {
    return <img src={url} loading={loading} alt="" />
  }

  return (
    <picture
      onError={() => setError(true)}
      data-test-id={TEST_ID.RESPONSIVE_IMG}
    >
      {smUpWidth && (
        <>
          <source
            media="(min-width: 475px)"
            srcSet={toSizedImageURL({
              url,
              width: smUpWidth,
              height: smUpHeight,
            })}
          />
        </>
      )}

      <source
        srcSet={toSizedImageURL({
          url,
          width,
          height,
        })}
      />

      <img
        src={url}
        srcSet={toSizedImageURL({ url, width, height })}
        loading={loading}
        alt=""
        crossOrigin={anonymous ? 'anonymous' : undefined}
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
      prevProps.disabled === props.disabled
    )
  }
) as MemoizedResponsiveImage
