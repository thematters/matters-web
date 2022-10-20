import { useState } from 'react'
import Lottie, { EventListener } from 'react-lottie'

import * as supportAndShipUp from '@/public/animations/01_投幣接飛船.json'
import * as shipAndHeartUp from '@/public/animations/03_飛船撒愛心.json'
import * as heartUp from '@/public/animations/04_愛心打開.json'

const firstAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: supportAndShipUp,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const secondAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: shipAndHeartUp,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const thirdAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: heartUp,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const Animation = () => {
  const [firstCompleted, setFirstCompleted] = useState(false)
  const [secondCompleted, setSecondCompleted] = useState(false)

  const firstListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      setFirstCompleted(true)
    },
  }

  const secondListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      setSecondCompleted(true)
    },
  }
  return (
    <section>
      {!firstCompleted && (
        <Lottie
          isClickToPauseDisabled
          options={firstAnimationOptions}
          height={136}
          width={166}
          eventListeners={[firstListener]}
        />
      )}
      {firstCompleted && !secondCompleted && (
        <Lottie
          isClickToPauseDisabled
          options={secondAnimationOptions}
          height={136}
          width={166}
          eventListeners={[secondListener]}
        />
      )}
      {secondCompleted && (
        <Lottie
          isClickToPauseDisabled
          options={thirdAnimationOptions}
          height={136}
          width={166}
        />
      )}
    </section>
  )
}

export default Animation
