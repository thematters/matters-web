import { useState } from 'react'

/**
 * Step controller for dialogs
 *
 */
export function useStep<Step>(defaultStep: Step) {
  const [steps, setSteps] = useState<Step[]>(defaultStep ? [defaultStep] : [])

  const prevStep = steps[steps.length - 2]
  const currStep = steps[steps.length - 1]

  const forward = (nextStep: Step) => {
    setSteps([...steps, nextStep])
  }

  const back = () => {
    setSteps(steps.slice(0, -1))
  }

  const reset = (step: Step) => setSteps([step])

  return { currStep, prevStep, forward, back, reset }
}
