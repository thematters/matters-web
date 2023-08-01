import React, { useState } from 'react'

import { toSizedImageURL, ToSizedImageURLSize } from '~/common/utils'

/**
 * Responsive Image
 */

interface ResponsiveImageProps {
  url: string
  width: ToSizedImageURLSize
  smUpWidth?: ToSizedImageURLSize
  disabled?: boolean
  loading?: 'eager' | 'lazy'
  anonymous?: boolean
}

const BaseResponsiveImage = ({
  url,
  width,
  smUpWidth,
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
    <picture onError={() => setError(true)}>
      {smUpWidth && (
        <>
          <source
            media="(min-width: 768px)"
            srcSet={toSizedImageURL({ url, width: smUpWidth })}
          />
        </>
      )}

      <source
        srcSet={toSizedImageURL({
          url,
          width,
        })}
      />

      <img
        src={url}
        srcSet={toSizedImageURL({ url, width })}
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
      prevProps.smUpWidth === props.smUpWidth &&
      prevProps.disabled === props.disabled
    )
  }
) as MemoizedResponsiveImage
