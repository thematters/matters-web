import { useState } from 'react'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

import Binding from './Binding'
import Complete from './Complete'
import Generating from './Generating'
import Select from './Select'

type Step = 'select' | 'binding' | 'generating' | 'complete'

interface Props {
  submitCallback?: () => void
  scrollLock?: boolean
}

const SetupLikeCoin: React.FC<Props> = ({ submitCallback, scrollLock }) => {
  const [step, setStepState] = useState<Step>('select')
  const setStep = (newStep: Step) => {
    setStepState(newStep)
    analytics.trackEvent(ANALYTICS_EVENTS.LIKECOIN_STEP_CHANGE, {
      from: step,
      to: newStep
    })
  }

  const [bindingWindowRef, setBindingWindowRef] = useState<Window | undefined>(
    undefined
  )
  const backToSelect = () => setStep('select')
  const complete = () => {
    if (submitCallback) {
      submitCallback()
    } else {
      setStep('complete')
    }
  }

  return (
    <>
      {step === 'select' && (
        <Select
          startGenerate={() => setStep('generating')}
          startBind={(windowRef?: Window) => {
            setStep('binding')
            if (windowRef) {
              setBindingWindowRef(windowRef)
            }
          }}
          scrollLock={scrollLock}
        />
      )}
      {step === 'generating' && (
        <Generating
          prevStep={backToSelect}
          nextStep={complete}
          scrollLock={scrollLock}
        />
      )}
      {step === 'binding' && (
        <Binding
          prevStep={backToSelect}
          nextStep={complete}
          windowRef={bindingWindowRef}
          scrollLock={scrollLock}
        />
      )}
      {step === 'complete' && <Complete scrollLock={scrollLock} />}
    </>
  )
}

export default SetupLikeCoin
