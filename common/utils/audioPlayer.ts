import { dom } from './dom'

function toHHMMSS(num: string | number) {
  const secNum = parseInt(num as string, 10) // don't forget the second param
  let hours: string | number = Math.floor(secNum / 3600)
  let minutes: string | number = Math.floor((secNum - hours * 3600) / 60)
  let seconds: string | number = secNum - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }

  if (hours === '00') {
    return minutes + ':' + seconds
  } else {
    return hours + ':' + minutes + ':' + seconds
  }
}

function removeAllListeners(element: HTMLElement) {
  const newElement = element.cloneNode(true)

  if (!element || !element.parentNode) {
    return
  }

  element.parentNode.replaceChild(newElement, element)

  return newElement
}

export const initAudioPlayers = () => {
  const audioFigures = dom.$$('figure.audio')

  Array.prototype.forEach.call(audioFigures, ($audioFigure: HTMLElement) => {
    // remove all listeners to re-initialize audio player
    const $newAudioFigure = removeAllListeners($audioFigure) as HTMLElement

    if (!$audioFigure) {
      return
    }

    const $audio = $newAudioFigure.querySelector('audio') as HTMLAudioElement
    const $play = $newAudioFigure.querySelector('.play') as HTMLElement
    const $current = $newAudioFigure.querySelector(
      '.time .current'
    ) as HTMLElement
    const $duration = $newAudioFigure.querySelector(
      '.time .duration'
    ) as HTMLElement
    const $progressBar = $newAudioFigure.querySelector(
      '.progress-bar'
    ) as HTMLElement
    const $progressBarValue = $newAudioFigure.querySelector(
      '.progress-bar span'
    ) as HTMLElement

    if (!$audio || !$play || !$duration || !$current) {
      return
    }

    // meta
    $audio.addEventListener('loadeddata', () => {
      $current.dataset.time = toHHMMSS($audio.currentTime)
      $duration.dataset.time = toHHMMSS($audio.duration)
    })

    // time update
    $audio.addEventListener('timeupdate', () => {
      timeUpdate()
    })
    $progressBar.addEventListener('click', e => {
      const position = e.pageX - $progressBar.getBoundingClientRect().left
      const percent = position / $progressBar.offsetWidth
      $audio.currentTime = $audio.duration * percent
      play()
    })

    // play state
    $audio.classList.add('u-area-disable')
    $audio.addEventListener('canplay', () => {
      $audio.classList.remove('u-area-disable')
    })
    $audio.addEventListener('pause', () => {
      pause()
    })
    $audio.addEventListener('play', () => {
      play()
    })
    $play.addEventListener('click', () => {
      if ($audio.paused) {
        play()
      } else {
        pause()
      }
    })

    // helper fns
    function timeUpdate() {
      const percent = ($audio.currentTime / $audio.duration) * 100 + '%'
      $current.dataset.time = toHHMMSS($audio.currentTime)
      console.log(percent, toHHMMSS($audio.currentTime))
      $progressBarValue.style.width = percent
    }
    function play() {
      $play.classList.add('paused')
      $audio.play()
    }
    function pause() {
      $play.classList.remove('paused')
      $audio.pause()
    }
  })
}
