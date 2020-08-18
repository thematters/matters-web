import { useState } from 'react'

/**
 * Dialog step controller
 *
 */
export function useDialogStep<Step>(defaultStep: Step) {
  const [steps, setSteps] = useState<Step[]>(defaultStep ? [defaultStep] : [])

  const prevStep = steps[steps.length - 2]
  const currStep = steps[steps.length - 1]

  const goForward = (nextStep: Step) => {
    setSteps([...steps, nextStep])
  }

  const goBack = () => {
    setSteps(steps.slice(0, -1))
  }

  console.log({ steps })

  return { currStep, prevStep, goForward, goBack }
}
