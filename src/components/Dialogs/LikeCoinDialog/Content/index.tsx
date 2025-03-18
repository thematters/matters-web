import { useState } from 'react'

import { useStep } from '~/components'

import Binding from './Binding'
import Complete from './Complete'
import Select from './Select'

type Step = 'select' | 'binding' | 'complete'

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
          startBind={(windowRef?: Window) => {
            forward('binding')
            if (windowRef) {
              setBindingWindowRef(windowRef)
            }
          }}
          closeDialog={closeDialog}
        />
      )}

      {currStep === 'binding' && (
        <Binding
          prevStep={backToSelect}
          nextStep={complete}
          windowRef={bindingWindowRef}
        />
      )}

      {currStep === 'complete' && <Complete closeDialog={closeDialog} />}
    </>
  )
}

export default LikeCoinDialogContent
