import { withRouter, WithRouterProps } from 'next/router'

import { getQuery } from '~/common/utils'

const OAuthCallbackSuccess: React.FC<WithRouterProps> = ({ router }) => {
  const provider = getQuery({ router, key: 'provider' })

  return <span>{provider} success</span>
}

export default withRouter(OAuthCallbackSuccess)
