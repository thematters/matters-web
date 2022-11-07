import React, { useEffect, useState } from 'react'
import Lottie, { EventListener } from 'react-lottie'
import { Waypoint } from 'react-waypoint'

import { IconSpinner16, Translate, useStep } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import styles from './styles.css'

type Step = 'coinShip' | 'shipWaiting' | 'shipSprinkleHeart' | 'openHeart'

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

  const [coinShipData, setCoinShipData] = useState<any>()
  const [shipWaitingData, setShipWaitingData] = useState<any>()
  const [shipSprinkHeartData, setShipSprinkHeartData] = useState<any>()
  const [openHeartData, setOpenHeartData] = useState<any>()

  useEffect(() => {
    import('@/public/static/json/coin-ship.json').then((res) =>
      setCoinShipData(res.default)
    )
    import('@/public/static/json/ship-waiting.json').then((res) =>
      setShipWaitingData(res.default)
    )
    import('@/public/static/json/ship-sprinkle-heart.json').then((res) =>
      setShipSprinkHeartData(res.default)
    )
    import('@/public/static/json/open-heart.json').then((res) =>
      setOpenHeartData(res.default)
    )
  }, [])

  useEffect(() => {
    if (isShipWaiting) {
      forward('shipSprinkleHeart')
    }
  }, [playShipWaiting])

  const defaultOptions = {
    loop: false,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const coinShipOptions = {
    ...defaultOptions,
    animationData: coinShipData,
  }

  const coinShipListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      playShipWaiting ? forward('shipWaiting') : forward('shipSprinkleHeart')
    },
  }

  const shipWaitingOptions = {
    ...defaultOptions,
    loop: true,
    animationData: shipSprinkHeartData,
  }

  const shipSprinkleHeartOptions = {
    ...defaultOptions,
    animationData: shipSprinkHeartData,
  }

  const shipSprinkleHeartListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      forward('openHeart')
    },
  }

  const openHeartOptions = {
    ...defaultOptions,
    animationData: openHeartData,
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

  if (
    !coinShipData ||
    !shipWaitingData ||
    !shipSprinkHeartData ||
    !openHeartData
  ) {
    return <IconSpinner16 size="lg" color="grey-light" />
  }

  return (
    <Waypoint>
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
            eventListeners={[shipSprinkleHeartListener]}
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
    </Waypoint>
  )
}

export default Animation
