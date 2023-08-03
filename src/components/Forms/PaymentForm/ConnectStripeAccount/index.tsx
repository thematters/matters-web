import { useStep } from '~/components'

import Onboarding from './Onboarding'
import Request from './Request'

type Step = 'request' | 'onboarding'

interface Props {
  back?: () => void
  nextStep: () => void
  closeDialog: () => void
}

const ConnectStripeAccountForm: React.FC<Props> = (props) => {
  const { currStep, forward } = useStep<Step>('request')

  if (currStep === 'request') {
    return <Request {...props} nextStep={() => forward('onboarding')} />
  }

  return <Onboarding {...props} />
}

export default ConnectStripeAccountForm
