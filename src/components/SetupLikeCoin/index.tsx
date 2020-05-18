import { useState } from 'react'

import { Dialog, Layout, SignUpForm } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

import Binding from './Binding'
import Generating from './Generating'
import Select from './Select'

type Step = 'select' | 'binding' | 'generating' | 'complete'

interface Props {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  closeDialog?: () => void
}

export const SetupLikeCoin: React.FC<Props> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'

  const [step, setStepState] = useState<Step>('select')
  const setStep = (newStep: Step) => {
    console.log('step', step)
    setStepState(newStep)
    analytics.trackEvent(ANALYTICS_EVENTS.LIKECOIN_STEP_CHANGE, {
      from: step,
      to: newStep,
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
      {isInPage && (
        <Layout.Header left={<Layout.Header.Title id="setupLikeCoin" />} />
      )}

      {isInDialog && closeDialog && (
        <Dialog.Header
          title="setupLikeCoin"
          close={closeDialog}
          closeTextId={step === 'complete' ? 'close' : 'cancel'}
        />
      )}

      {step === 'select' && (
        <Select
          startGenerate={() => setStep('generating')}
          startBind={(windowRef?: Window) => {
            setStep('binding')
            if (windowRef) {
              setBindingWindowRef(windowRef)
            }
          }}
        />
      )}

      {step === 'generating' && (
        <Generating prevStep={backToSelect} nextStep={complete} />
      )}

      {step === 'binding' && (
        <Binding
          prevStep={backToSelect}
          nextStep={complete}
          windowRef={bindingWindowRef}
        />
      )}

      {step === 'complete' && <SignUpForm.Complete />}
    </>
  )
}
