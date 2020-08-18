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

  const { currStep, goForward } = useStep<Step>('select')

  const [bindingWindowRef, setBindingWindowRef] = useState<Window | undefined>(
    undefined
  )
  const backToSelect = () => goForward('select')
  const complete = () => {
    if (submitCallback) {
      submitCallback()
    } else {
      goForward('complete')
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
          startGenerate={() => goForward('generating')}
          startBind={(windowRef?: Window) => {
            goForward('binding')
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
