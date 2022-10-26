import React, { useEffect } from 'react'
import Lottie, { EventListener } from 'react-lottie'

import { Translate, useStep } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import * as coinShip from '@/public/static/json/coin-ship.json'
import * as openHeart from '@/public/static/json/open-heart.json'
import * as shipSprinkleHeart from '@/public/static/json/ship-sprinkle-heart.json'
import * as shipWaiting from '@/public/static/json/ship-waiting.json'

import styles from './styles.css'

type Step = 'coinShip' | 'shipWaiting' | 'shipSprinkleHeart' | 'openHeart'

const coinShipOptions = {
  loop: false,
  autoplay: true,
  animationData: coinShip,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const shipWaitingOptions = {
  loop: true,
  autoplay: true,
  animationData: shipWaiting,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const shipSprinkleHeartOptions = {
  loop: false,
  autoplay: true,
  animationData: shipSprinkleHeart,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const openHeartOptions = {
  loop: false,
  autoplay: true,
  animationData: openHeart,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

interface Props {
  playEnd: () => void
  playShipWaiting: boolean
  currency: CURRENCY
  defaultStep?: Step
}

const Animation: React.FC<Props> = ({
  playEnd,
  currency,
  playShipWaiting = false,
  defaultStep = 'coinShip',
}) => {
  const { currStep, forward } = useStep<Step>(defaultStep)

  const isCoinShip = currStep === 'coinShip'
  const isShipWaiting = currStep === 'shipWaiting'
  const isShipSprinkHeart = currStep === 'shipSprinkleHeart'
  const isOpenHeart = currStep === 'openHeart'

  useEffect(() => {
    if (isShipWaiting) {
      forward('shipSprinkleHeart')
    }
  }, [playShipWaiting])

  const coinShipListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      playShipWaiting ? forward('shipWaiting') : forward('shipSprinkleHeart')
    },
  }

  const shiSprinkleHeartListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      forward('openHeart')
    },
  }

  const openHeartListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      playEnd()
    },
  }

  const LottieProps = {
    isClickToPauseDisabled: true,
    height: 136,
    width: 166,
  }

  return (
    <section>
      <p className="animation-hint">
        {isShipWaiting && currency === CURRENCY.LIKE && (
          <Translate
            zh_hant="支付請求已送出，LikeCoin 網絡確認中⋯"
            zh_hans="支付请求已送出，LikeCoin 网络确认中⋯"
            en="The payment request has been sent, and the LikeCoin is confirming…"
          />
        )}
        {isShipWaiting && currency === CURRENCY.USDT && (
          <Translate
            zh_hant="支付請求已送出，Polygon 網絡確認中⋯"
            zh_hans="支付請求已送出，Polygon 网络确认中⋯"
            en="The payment request has been sent, and the Polygon is confirming…"
          />
        )}
      </p>
      {isCoinShip && (
        <Lottie
          options={coinShipOptions}
          eventListeners={[coinShipListener]}
          {...LottieProps}
        />
      )}
      {isShipWaiting && (
        <Lottie options={shipWaitingOptions} {...LottieProps} />
      )}
      {isShipSprinkHeart && (
        <Lottie
          options={shipSprinkleHeartOptions}
          eventListeners={[shiSprinkleHeartListener]}
          {...LottieProps}
        />
      )}
      {isOpenHeart && (
        <Lottie
          options={openHeartOptions}
          eventListeners={[openHeartListener]}
          {...LottieProps}
        />
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

export default Animation
