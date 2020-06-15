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

export const Img = ({ url, size, smUpSize, disabled }: ImgProps) => {
  if (disabled) {
    return <img src={url} loading="lazy" />
  }

  return (
    <picture>
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
