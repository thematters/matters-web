import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Spinner, Translate, useRoute } from '~/components'

import CopyButton from './CopyButton'
import styles from './styles.css'

import { ArticleSecret } from './__generated__/ArticleSecret'

export const QUERY_SECRET = gql`
  query ArticleSecret($mediaHash: String!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      access {
        secret
      }
    }
  }
`

const ArticleSecretSection = () => {
  const { getQuery } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const { data, loading, error } = useQuery<ArticleSecret>(QUERY_SECRET, {
    variables: { mediaHash },
  })
  const secret = data?.article?.access?.secret

  return (
    <section className="secret">
      {(!data || loading) && !error && <Spinner />}
      {secret && (
        <>
          <header>
            <span style={{ display: 'flex' }}>
              <h4>
                <Translate id="secret" />
              </h4>
              <span className="subtitle">
                <Translate
                  zh_hans="（仅你可见，请妥善保管）"
                  zh_hant="（僅你可見，請妥善保管）"
                  en="(Only you can see the secret, please keep it confidential)"
                />
              </span>
            </span>

            <CopyButton text={secret} />
          </header>

          <section>
            <input
              type="text"
              value={secret}
              readOnly
              onClick={(event) => event.currentTarget.select()}
            />
          </section>
        </>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

export default ArticleSecretSection
