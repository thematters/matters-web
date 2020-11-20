import { useState } from 'react'

import { Dialog, useStep } from '~/components'

import Binding from './Binding'
import Complete from './Complete'
import Generating from './Generating'
import Select from './Select'

type Step = 'select' | 'binding' | 'generating' | 'complete'

interface Props {
  closeDialog: () => void
  submitCallback?: () => void
}

export const SetupLikeCoin: React.FC<Props> = ({
  closeDialog,
  submitCallback,
}) => {
  const { currStep, forward } = useStep<Step>('select')

  const [bindingWindowRef, setBindingWindowRef] = useState<Window | undefined>(
    undefined
  )
  const backToSelect = () => forward('select')
  const complete = () => {
    if (submitCallback) {
      submitCallback()
    } else {
      forward('complete')
    }
  }

  return (
    <>
      <Dialog.Header
        title="setupLikeCoin"
        close={closeDialog}
        closeTextId={currStep === 'complete' ? 'close' : 'cancel'}
      />

      {currStep === 'select' && (
        <Select
          startGenerate={() => forward('generating')}
          startBind={(windowRef?: Window) => {
            forward('binding')
            if (windowRef) {
              setBindingWindowRef(windowRef)
            }
          }}
        />
      )}

      {currStep === 'generating' && (
        <Generating prevStep={backToSelect} nextStep={complete} />
      )}

      {currStep === 'binding' && (
        <Binding
          prevStep={backToSelect}
          nextStep={complete}
          windowRef={bindingWindowRef}
        />
      )}

      {currStep === 'complete' && <Complete />}
    </>
  )
}
