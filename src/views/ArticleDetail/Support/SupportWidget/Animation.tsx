import classNames from 'classnames'
import Lottie from 'lottie-react'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import coinShipData from '@/public/static/json/coin-ship.json'
import openHeartData from '@/public/static/json/open-heart.json'
import shipSprinkHeartData from '@/public/static/json/ship-sprinkle-heart.json'
import shipWaitingData from '@/public/static/json/ship-waiting.json'
import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { useStep } from '~/components'

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
  const [rendered, setRendered] = React.useState(false)

  useEffect(() => {
    setRendered(true)
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

  const shipWaitingOptions = {
    ...defaultOptions,
    loop: true,
    animationData: shipWaitingData,
  }

  const shipSprinkleHeartOptions = {
    ...defaultOptions,
    animationData: shipSprinkHeartData,
  }

  const openHeartOptions = {
    ...defaultOptions,
    animationData: openHeartData,
  }

  const lottieProps = {
    isClickToPauseDisabled: true,
    height: 136,
    width: 166,
  }

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.slideUp]: rendered,
  })

  return (
    <section className={containerClasses}>
      <p className={styles.animationHint}>
        {isShipWaiting && currency === CURRENCY.LIKE && (
          <FormattedMessage
            defaultMessage="Request on {network} network will be confirmed and synced to Matters in a bit"
            values={{
              network: 'LikeCoin',
            }}
            id="t2EpN/"
          />
        )}
        {isShipWaiting && currency === CURRENCY.USDT && (
          <FormattedMessage
            defaultMessage="Request on {network} network will be confirmed and synced to Matters in a bit"
            values={{
              network: 'Optimism',
            }}
            id="t2EpN/"
          />
        )}
      </p>
      {isCoinShip && (
        <Lottie
          {...coinShipOptions}
          {...lottieProps}
          onComplete={() => {
            if (playShipWaiting) {
              forward('shipWaiting')
            } else {
              forward('openHeart')
            }
          }}
        />
      )}
      {isShipWaiting && <Lottie {...shipWaitingOptions} {...lottieProps} />}
      {isShipSprinkHeart && (
        <Lottie
          {...shipSprinkleHeartOptions}
          onComplete={() => {
            forward('openHeart')
          }}
          {...lottieProps}
        />
      )}
      {isOpenHeart && (
        <Lottie
          {...openHeartOptions}
          {...lottieProps}
          onComplete={() => {
            playEnd()
          }}
        />
      )}
    </section>
  )
}

export default Animation
