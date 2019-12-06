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
    /**
     * Init
     */
    if ($audioFigure.hasAttribute('initialized')) {
      return
    } else {
      $audioFigure.setAttribute('initialized', '')
    }

    const $audio = $audioFigure.querySelector('audio') as HTMLAudioElement
    // const $player = $audioFigure.querySelector('.player') as HTMLElement
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

    $audio.setAttribute('preload', 'metadata')

    if ($audio.readyState > 3) {
      timeUpdate()
    }
    $play.setAttribute('role', 'button')
    pause()

    /**
     * Events
     */
    $audio.addEventListener('canplay', () => {
      loaded()
    })
    $audio.addEventListener('loadedmetadata', () => {
      loaded()
      timeUpdate()
    })
    $audio.addEventListener('durationchange	', () => {
      timeUpdate()
    })
    $audio.addEventListener('timeupdate', () => {
      timeUpdate()
    })
    $audio.addEventListener('seeked', () => {
      loaded()
    })
    $audio.addEventListener('seeking', () => {
      loading()
    })

    $progressBar.addEventListener('click', e => {
      const position = e.pageX - $progressBar.getBoundingClientRect().left
      const percent = position / $progressBar.offsetWidth
      $audio.currentTime = $audio.duration * percent
      updateProgress(percent * 100 + '%')
      play()
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

    /**
     * Helpers
     */
    function timeUpdate() {
      // update time
      const currTime = toHHMMSS($audio.currentTime)
      $current.dataset.time = currTime
      $current.setAttribute('aira-label', `當前 ${currTime}`)

      $duration.dataset.time = toHHMMSS($audio.duration)
      $duration.setAttribute('aira-label', `時長 ${toHHMMSS($audio.duration)}`)

      updateProgress(($audio.currentTime / $audio.duration) * 100 + '%')
    }
    function updateProgress(percent: string) {
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
    function loaded() {
      $play.classList.remove('loading')
    }
    function loading() {
      $play.classList.add('loading')
    }
  })
}
