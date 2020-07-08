import React, { useState } from 'react'

import { toSizedImageURL, ToSizedImageURLSize } from '~/common/utils'

/**
 * Responsive Image
 */

interface ImgProps {
  url: string
  size: ToSizedImageURLSize
  smUpSize?: ToSizedImageURLSize
  disabled?: boolean
}

const BaseImg = ({ url, size, smUpSize, disabled }: ImgProps) => {
  const [error, setError] = useState(false)

  // Fallback to the raw `url` if manually disable or responsive image is failed to load
  if (disabled || error) {
    return <img src={url} loading="lazy" />
  }

  return (
    <picture onError={() => setError(true)}>
      {smUpSize && (
        <source
          type="image/webp"
          media="(min-width: 768px)"
          srcSet={toSizedImageURL({
            url,
            size: smUpSize,
            ext: 'webp',
          })}
        />
      )}
      {smUpSize && (
        <source
          media="(min-width: 768px)"
          srcSet={toSizedImageURL({ url, size: smUpSize })}
        />
      )}

      <source
        type="image/webp"
        srcSet={toSizedImageURL({
          url,
          size,
          ext: 'webp',
        })}
      />

      <img src={url} srcSet={toSizedImageURL({ url, size })} loading="lazy" />
    </picture>
  )
}

/**
 * Memoizing
 */
type MemoizedImg = React.MemoExoticComponent<React.FC<ImgProps>>

export const Img = React.memo(BaseImg, (prevProps, props) => {
  return (
    prevProps.url === props.url &&
    prevProps.size === props.size &&
    prevProps.smUpSize === props.smUpSize &&
    prevProps.disabled === props.disabled
  )
}) as MemoizedImg
