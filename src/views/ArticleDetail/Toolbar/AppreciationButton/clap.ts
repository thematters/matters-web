import _debounce from 'lodash/debounce'

import ICON_LIKE_EXPLODE from '~/static/icons/like-explode.svg?include'

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

export const explode = (
  $clapButton: HTMLButtonElement,
  inFixedToolbar: boolean
) => {
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
  const { rangeRotate, rangeScale, iconDefaultSize } = inFixedToolbar
    ? {
        rangeRotate: [-180, 100],
        rangeScale: [1.6, 2],
        iconDefaultSize: 20
      }
    : {
        rangeRotate: [-45, 15],
        rangeScale: [2.8, 3.6],
        iconDefaultSize: 22
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

export const clap = (
  $clapButton: HTMLButtonElement,
  inFixedToolbar: boolean
) => {
  // hand zoom in
  handZoomOut($clapButton)
  handZoomIn($clapButton)

  // explode
  explode($clapButton, inFixedToolbar)
}
