import _debounce from 'lodash/debounce'

import ICON_LIKE_EXPLODE from '~/static/icons/like-explode.svg?include'

export const getRandomFloat = (
  min: number,
  max: number,
  digits: number = 1
) => {
  return parseFloat((Math.random() * (max - min + 1) + min).toFixed(digits))
}

export const handZoomOut = ($clapButton: HTMLButtonElement) => {
  $clapButton.classList.remove('clap-hand-zoom-in')
}
export const handZoomIn = _debounce(($clapButton: HTMLButtonElement) => {
  $clapButton.classList.add('clap-hand-zoom-in')
}, 1000 / 60)

export const explode = ($clapButton: HTMLButtonElement) => {
  const $explode = document.createElement('span')

  // icon
  $explode.innerHTML = ICON_LIKE_EXPLODE

  // style
  const $style = document.createElement('style')
  const randomRotationAngle = getRandomFloat(-180, 180, 0)
  const randomScale = getRandomFloat(3, 4) * (randomRotationAngle > 0 ? -1 : 1)
  const animationName = `explode-${randomRotationAngle}`
  $style.innerHTML = `
    .${animationName} svg {
      animation-name: ${animationName};
    }

    @keyframes ${animationName} {
      0% {
        transform: scale(1) rotate(${randomRotationAngle}deg);
        opacity: 1;
      }
      30% {
        transform: scale(${randomScale}) rotate(${randomRotationAngle}deg);
        opacity: 1;
      }
      100% {
        transform: scale(${randomScale}) rotate(${randomRotationAngle}deg);
        opacity: 0;
      }
    }
  `
  $explode.appendChild($style)

  // append to button
  $explode.className = `clap-explode ${animationName}`
  $clapButton.appendChild($explode)
}

export const clap = ($clapButton: HTMLButtonElement) => {
  // hand zoom in
  handZoomOut($clapButton)
  handZoomIn($clapButton)

  // explode
  explode($clapButton)
}
