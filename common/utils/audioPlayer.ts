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

export const initAudioPlayers = () => {
  const audioFigures = dom.$$('figure.audio')

  Array.prototype.forEach.call(audioFigures, ($audioFigure: HTMLElement) => {
    if ($audioFigure.hasAttribute('initialized')) {
      return
    } else {
      $audioFigure.setAttribute('initialized', '')
    }

    const $audio = $audioFigure.querySelector('audio') as HTMLAudioElement
    const $player = $audioFigure.querySelector('.player') as HTMLElement
    const $play = $audioFigure.querySelector('.play') as HTMLElement
    const $current = $audioFigure.querySelector('.time .current') as HTMLElement
    const $duration = $audioFigure.querySelector(
      '.time .duration'
    ) as HTMLElement
    const $progressBar = $audioFigure.querySelector(
      '.progress-bar'
    ) as HTMLElement
    const $progressBarValue = $audioFigure.querySelector(
      '.progress-bar span'
    ) as HTMLElement

    if (!$audio || !$play || !$duration || !$current) {
      return
    }

    // init
    if ($audio.readyState <= 3) {
      $player.classList.add('u-area-disable')
    }
    $audio.addEventListener('canplay', () => {
      $player.classList.remove('u-area-disable')
    })
    $audio.addEventListener('loadeddata', () => {
      const currTime = toHHMMSS($audio.currentTime)
      $current.dataset.time = currTime
      $current.setAttribute('aira-label', `當前 ${currTime}`)

      $duration.dataset.time = toHHMMSS($audio.duration)
      $duration.setAttribute('aira-label', `時長 ${toHHMMSS($audio.duration)}`)
    })
    $play.setAttribute('role', 'button')
    $play.setAttribute('aria-label', '播放')

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
      // update time
      const currTime = toHHMMSS($audio.currentTime)
      $current.dataset.time = currTime
      $current.setAttribute('aira-label', `當前 ${currTime}`)

      // update progress
      const percent = ($audio.currentTime / $audio.duration) * 100 + '%'
      $progressBarValue.style.width = percent
    }
    function play() {
      $play.classList.add('paused')
      $play.setAttribute('aria-label', '暫停')
      $audio.play()
    }
    function pause() {
      $play.classList.remove('paused')
      $play.setAttribute('aria-label', '播放')
      $audio.pause()
    }
  })
}
