import { useState } from 'react'

import Binding from './Binding'
import Complete from './Complete'
import Generating from './Generating'
import Select from './Select'

interface Props {
  submitCallback?: () => void
  scrollLock?: boolean
}

type Step = 'select' | 'binding' | 'generating' | 'complete'

const SetupLikeCoin: React.FC<Props> = ({ submitCallback, scrollLock }) => {
  const [step, setStep] = useState<Step>('select')
  const backToSelect = () => setStep('select')
  const complete = () => setStep('complete')

  return (
    <>
      {step === 'select' && (
        <Select
          startGenerate={() => setStep('generating')}
          startBind={() => setStep('binding')}
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
          scrollLock={scrollLock}
        />
      )}
      {step === 'complete' && <Complete scrollLock={scrollLock} />}
    </>
  )
}

export default SetupLikeCoin
