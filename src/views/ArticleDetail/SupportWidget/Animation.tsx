import React, { useState } from 'react'
import Lottie, { EventListener } from 'react-lottie'

import * as coinShip from '@/public/static/json/coin-ship.json'
import * as openHeart from '@/public/static/json/open-heart.json'
import * as shipSprinkleHeart from '@/public/static/json/ship-sprinkle-heart.json'

const firstAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: coinShip,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const secondAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: shipSprinkleHeart,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const thirdAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: openHeart,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

interface Props {
  callback: () => void
}

const Animation: React.FC<Props> = ({ callback }) => {
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

  const thirdListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      callback()
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
          eventListeners={[thirdListener]}
        />
      )}
    </section>
  )
}

export default Animation
