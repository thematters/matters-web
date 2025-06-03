import { useRef, useState } from 'react'

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d === 0) h = 0
  else if (max === r) h = ((g - b) / d) % 6
  else if (max === g) h = (b - r) / d + 2
  else if (max === b) h = (r - g) / d + 4
  const l = (min + max) / 2
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  return [h * 60, s, l]
}

export const useColorThief = () => {
  const [dominantColor, setDominantColor] = useState<string>()
  const nodeRef = useRef<HTMLDivElement>(null)
  let tryGetColorTime = 5

  const _getColor = () => {
    import('colorthief').then(({ default: ColorThief }) => {
      try {
        const colorThief = new ColorThief()
        const $img = nodeRef.current?.querySelector('img') as HTMLImageElement
        const colors = colorThief.getColor($img)
        const hsl = rgbToHsl(...colors)
        setDominantColor(
          `hsla(${parseInt(hsl[0] + '')}, ${parseFloat(
            hsl[1] * 100 + ''
          ).toFixed(2)}%, 30%, 1)`
        )
      } catch (error) {
        if (isSecurityError(error)) {
          // Throws this error in Firefox
          setTimeout(() => {
            if (tryGetColorTime > 0) {
              _getColor()
              tryGetColorTime--
            }
          }, 1000)
        }
      }
    })
  }

  function isSecurityError(error: unknown): error is DOMException {
    return error instanceof DOMException && error.name === 'SecurityError'
  }

  const getColor = () => {
    const $img = nodeRef.current?.querySelector('img') as HTMLImageElement
    if ($img) {
      $img.crossOrigin = 'anonymous'
      if ($img.complete) {
        _getColor()
      } else {
        $img.addEventListener('load', function () {
          _getColor()
        })
      }
    }
  }

  return { getColor, dominantColor, nodeRef }
}
