import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  CopyButton,
  IconLocked,
  Spinner,
  Translate,
  useRoute,
} from '~/components'

// import styles from './styles.css'

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
  const secret = data?.article?.access?.secret // || 'default-no-secret'

  return (
    <section className="secret">
      {(!data || loading) && !error && <Spinner />}
      {secret && (
        <>
          <header>
            <small>
              <Translate
                zh_hant="上鎖內容密鑰，請妥善保管"
                zh_hans="上鎖內容密鑰，請妥善保管"
                en="The key for locked content, please save securely"
              />
            </small>
          </header>

          <section className="key">
            <div className="locked">
              <IconLocked />
            </div>
            <input
              type="text"
              value={secret}
              readOnly
              onClick={(event) => event.currentTarget.select()}
            />
            <CopyButton text={secret} />
          </section>
        </>
      )}
      <style jsx>{`
        .secret {
          @mixin flex-center-space-between;

          color: var(--color-matters-gold);

          & .key {
            @mixin flex-center-space-between;

            position: relative;
            background: var(--color-yellow-lighter);
            border-radius: var(--spacing-base);

            & .locked {
              @mixin flex-center-space-between;

              position: absolute;
              left: var(--spacing-x-tight);
              width: 1rem;
              height: 2rem;
            }

            & input {
              max-width: 8rem;
              padding: var(--spacing-x-tight) var(--spacing-base)
                var(--spacing-x-tight) var(--spacing-loose);
              font-family: var(--font-mono);
              font-size: var(--font-size-sm);
              background: var(--color-yellow-lighter);
              border-radius: var(--spacing-base);
            }

            & button {
              position: absolute;
              right: var(--spacing-loose);
            }
          }
        }
      `}</style>
    </section>
  )
}

export default ArticleSecretSection
