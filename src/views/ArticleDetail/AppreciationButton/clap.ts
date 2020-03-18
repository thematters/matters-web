import _debounce from 'lodash/debounce'

const ICON_LIKE_EXPLODE = `
<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.42 2.38c-.07.06-.14.02-.2 0-.28-.13-1.43-.81-1.65-.98-.1-.08-.11-.17-.06-.26.05-.11.19-.24.42-.45.23-.2.38-.31.5-.36.1-.04.19-.02.26.1.13.25.65 1.47.75 1.76.01.06.04.14-.02.2v-.01zm-.45.8c.01.09-.05.12-.12.17-.25.17-1.42.8-1.68.9-.13.05-.21.01-.26-.07-.07-.12-.1-.3-.16-.6a2 2 0 01-.05-.63c.02-.1.08-.16.22-.15.29 0 1.6.19 1.9.26.05.01.13.03.15.12zm9.84 9.98c.09 0 .13.06.16.1.14.28.64 1.5.72 1.77.04.14-.02.21-.1.25-.13.06-.32.09-.62.1-.31.03-.5.03-.63-.01-.1-.03-.15-.1-.13-.23.04-.27.36-1.56.47-1.84.02-.06.05-.13.13-.14zm.74-.6c.04-.08.13-.07.18-.06.3.02 1.6.23 1.88.3.13.04.17.13.16.23-.02.12-.09.3-.23.57-.13.27-.24.43-.34.52-.07.07-.16.08-.26 0a19.92 19.92 0 01-1.34-1.37c-.04-.05-.09-.1-.05-.18v-.01z" fill-rule="nonzero"/>
</svg>
`

export const getRandomFloat = (
  min: number,
  max: number,
  digits: number = 1
) => {
  return parseFloat(
    (Math.random() * (max - min + 1 / 10 ** digits) + min).toFixed(digits)
  )
}

export const handZoomOut = ($clapButton: HTMLButtonElement) => {
  $clapButton.classList.remove('clap-hand-zoom-in')
}
export const handZoomIn = _debounce(($clapButton: HTMLButtonElement) => {
  $clapButton.classList.add('clap-hand-zoom-in')
}, 1000 / 60)

export const explode = ($clapButton: HTMLButtonElement) => {
  const id = `explode-${Date.now()}`
  const $explode = document.createElement('span')

  // icon
  $explode.innerHTML = ICON_LIKE_EXPLODE

  // remove when animation end
  const $icon = $explode.querySelector('svg')
  if ($icon) {
    $icon.addEventListener('animationend', event => {
      if (event.animationName === id) {
        $explode.remove()
      }
    })
  }

  // style
  const $style = document.createElement('style')
  const { rangeRotate, rangeScale, iconDefaultSize } = {
    rangeRotate: [-45, 15],
    rangeScale: [2.8, 3.6],
    iconDefaultSize: 24
  }
  const rotate = getRandomFloat(rangeRotate[0], rangeRotate[1], 0)
  const scale = getRandomFloat(rangeScale[0], rangeScale[1])
  const flip = rotate > 0 ? -1 : 1
  const size = iconDefaultSize * scale

  $style.innerHTML = `
    .clap-explode.${id} svg {
      width: ${size}px;
      height: ${size}px;
      margin: -${size / 2}px 0 0 -${size / 2}px;
      animation-name: ${id};
    }
    @keyframes ${id} {
      0% {
        transform: scale(${(1 / scale) * flip}) rotate(${rotate}deg);
        opacity: 1;
      }
      30% {
        transform: scale(${flip}) rotate(${rotate}deg);
        opacity: 1;
      }
      100% {
        transform: scale(${flip}) rotate(${rotate}deg);
        opacity: 0;
      }
    }
  `
  $explode.appendChild($style)

  // append to button
  $explode.className = `clap-explode ${id}`
  $clapButton.appendChild($explode)
}

export const clap = ($clapButton: HTMLButtonElement) => {
  // hand zoom in
  handZoomOut($clapButton)
  handZoomIn($clapButton)

  // explode
  explode($clapButton)
}
