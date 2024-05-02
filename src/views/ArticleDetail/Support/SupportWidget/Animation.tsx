import classNames from 'classnames'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Lottie, { EventListener } from 'react-lottie'

import donateData from '@/public/static/json/donate.json'
import loadingData from '@/public/static/json/loading.json'
import successData from '@/public/static/json/success.json'
import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { useStep } from '~/components'

import styles from './styles.module.css'

type Step = 'donate' | 'loading' | 'success'

interface Props {
  playEnd: () => void
  playLoading: boolean
  currency: CURRENCY
  defaultStep?: Step
}

const Animation: React.FC<Props> = ({
  playEnd,
  currency,
  playLoading = false,
  defaultStep = 'donate',
}) => {
  const { currStep, forward } = useStep<Step>(defaultStep)
  const isDonate = currStep === 'donate'
  const isLoading = currStep === 'loading'
  const isSuccess = currStep === 'success'
  const [rendered, setRendered] = React.useState(false)

  useEffect(() => {
    setRendered(true)
  }, [])

  useEffect(() => {
    if (isLoading) {
      forward('success')
    }
  }, [playLoading])

  const defaultOptions = {
    loop: false,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const donateOptions = {
    ...defaultOptions,
    animationData: donateData,
  }

  const donateListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      playLoading ? forward('loading') : forward('success')
    },
  }

  const loadingOptions = {
    ...defaultOptions,
    loop: true,
    animationData: loadingData,
  }

  const successOptions = {
    ...defaultOptions,
    animationData: successData,
  }

  const successListener: EventListener = {
    eventName: 'complete',
    callback: () => {
      playEnd()
    },
  }

  const LottieProps = {
    isClickToPauseDisabled: true,
    height: 120,
    width: 120,
  }

  const containerClasses = classNames({
    [styles.slideUp]: rendered,
  })

  return (
    <section className={containerClasses}>
      <p className={styles.animationHint}>
        {isLoading && currency === CURRENCY.LIKE && (
          <FormattedMessage
            defaultMessage="Request on {network} network will be confirmed and synced to Matters in a bit"
            values={{
              network: 'LikeCoin',
            }}
            id="t2EpN/"
          />
        )}
        {isLoading && currency === CURRENCY.USDT && (
          <FormattedMessage
            defaultMessage="Request on {network} network will be confirmed and synced to Matters in a bit"
            values={{
              network: 'Optimism',
            }}
            id="t2EpN/"
          />
        )}
      </p>
      {isDonate && (
        <Lottie
          options={donateOptions}
          eventListeners={[donateListener]}
          {...LottieProps}
        />
      )}
      {isLoading && <Lottie options={loadingOptions} {...LottieProps} />}
      {isSuccess && (
        <Lottie
          options={successOptions}
          eventListeners={[successListener]}
          {...LottieProps}
        />
      )}
    </section>
  )
}

export default Animation
