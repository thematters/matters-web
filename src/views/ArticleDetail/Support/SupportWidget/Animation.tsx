import React, { useEffect } from 'react'
import Lottie, { EventListener } from 'react-lottie'

import coinShipData from '@/public/static/json/coin-ship.json'
import openHeartData from '@/public/static/json/open-heart.json'
import shipSprinkHeartData from '@/public/static/json/ship-sprinkle-heart.json'
import shipWaitingData from '@/public/static/json/ship-waiting.json'
import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Translate, useStep } from '~/components'

import styles from './styles.module.css'

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
      playShipWaiting ? forward('shipWaiting') : forward('openHeart')
    },
  }

  const shipWaitingOptions = {
    ...defaultOptions,
    loop: true,
    animationData: shipWaitingData,
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

  return (
    <section>
      <p className={styles.animationHint}>
        {isShipWaiting && currency === CURRENCY.LIKE && (
          <Translate
            zh_hant="持續與 LikeCoin 網絡同步，稍後更新至 Matters"
            zh_hans="持续与 LikeCoin 网络同步，稍后更新至 Matters"
            en="Request on LikeCoin network will be confirmed and synced to Matters in a bit"
          />
        )}
        {isShipWaiting && currency === CURRENCY.USDT && (
          <Translate
            zh_hant="持續與 Optimism 網絡同步，稍後更新至 Matters"
            zh_hans="持续与 Optimism 网络同步，稍后更新至 Matters"
            en="Request on Optimism network will be confirmed and synced to Matters in a bit"
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
    </section>
  )
}

export default Animation
