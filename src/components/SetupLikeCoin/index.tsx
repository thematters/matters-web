import { useState } from 'react'

import { Dialog, Layout, SignUpForm, useStep } from '~/components'

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
      {isInPage && (
        <Layout.Header left={<Layout.Header.Title id="setupLikeCoin" />} />
      )}

      {isInDialog && closeDialog && (
        <Dialog.Header
          title="setupLikeCoin"
          close={closeDialog}
          closeTextId={currStep === 'complete' ? 'close' : 'cancel'}
        />
      )}

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

      {currStep === 'complete' && <SignUpForm.Complete />}
    </>
  )
}
