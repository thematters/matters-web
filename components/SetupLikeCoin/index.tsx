import { useState } from 'react'

import Binding from './Binding'
import Complete from './Complete'
import Generating from './Generating'
import Select from './Select'

interface Props {
  submitCallback?: () => void
}

type Step = 'select' | 'binding' | 'generating' | 'complete'

const SetupLikeCoin: React.FC<Props> = () => {
  const [step, setStep] = useState<Step>('select')
  const backToSelect = () => setStep('select')
  const complete = () => setStep('complete')

  console.log(step)

  return (
    <>
      {step === 'select' && (
        <Select
          startGenerate={() => setStep('generating')}
          startBind={() => setStep('binding')}
        />
      )}
      {step === 'generating' && (
        <Generating prevStep={backToSelect} nextStep={complete} />
      )}
      {step === 'binding' && (
        <Binding prevStep={backToSelect} nextStep={complete} />
      )}
      {step === 'complete' && <Complete />}
    </>
  )
}

export default SetupLikeCoin
