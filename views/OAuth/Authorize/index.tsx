import classNames from 'classnames'
import getConfig from 'next/config'
import { withRouter, WithRouterProps } from 'next/router'

import { Button } from '~/components'

import styles from './styles.css'

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()
const OAUTH_AUTHORIZE_ENDPOINT = `${OAUTH_URL}/authorize`

const OAuthAuthorize: React.FC<WithRouterProps> = ({ router }) => {
  const containerClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-offset-sm-1',
    'l-col-md-4',
    'l-offset-md-2',
    'l-col-lg-6',
    'l-offset-lg-3',
    'container'
  )
  const qs = (router ? router.query : {}) as { [key: string]: any }

  return (
    <>
      <main className="l-row">
        <article className={containerClass}>
          <form action={OAUTH_AUTHORIZE_ENDPOINT} method="post">
            <input type="hidden" name="client_id" value={qs.client_id} />
            {qs.state && <input type="hidden" name="state" value={qs.state} />}
            {qs.scope && <input type="hidden" name="scope" value={qs.scope} />}
            {qs.redirect_uri && (
              <input
                type="hidden"
                name="redirect_uri"
                value={qs.redirect_uri}
              />
            )}
            <input type="hidden" name="response_type" value="code" />
            <Button type="submit" bgColor="green">
              同意
            </Button>
          </form>
        </article>
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default withRouter(OAuthAuthorize)
