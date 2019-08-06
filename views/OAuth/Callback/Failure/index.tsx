import { withRouter, WithRouterProps } from 'next/router'

import { getQuery } from '~/common/utils'

const OAuthCallbackFailure: React.FC<WithRouterProps> = ({ router }) => {
  const provider = getQuery({ router, key: 'provider' })
  const code = getQuery({ router, key: 'code' })

  return (
    <span>
      {provider} failure: {code}
    </span>
  )
}

export default withRouter(OAuthCallbackFailure)
