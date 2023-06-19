import { useState } from 'react'

import { useStep } from '~/components'

import Binding from './Binding'
import Complete from './Complete'
import Generating from './Generating'
import Select from './Select'

type Step = 'select' | 'binding' | 'generating' | 'complete'

interface Props {
  closeDialog: () => void
  submitCallback?: () => void
}

const LikeCoinDialogContent: React.FC<Props> = ({
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
      {currStep === 'select' && (
        <Select
          startGenerate={() => forward('generating')}
          startBind={(windowRef?: Window) => {
            forward('binding')
            if (windowRef) {
              setBindingWindowRef(windowRef)
            }
          }}
          closeDialog={closeDialog}
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

export default LikeCoinDialogContent
