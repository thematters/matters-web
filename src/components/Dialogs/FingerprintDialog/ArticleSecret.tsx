import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Button,
  CopyToClipboard,
  IconCopy16,
  IconLocked24,
  Spinner,
  Translate,
} from '~/components'

import styles from './styles.css'

import {
  ArticleSecret,
  ArticleSecret_article_Article,
} from './__generated__/ArticleSecret'

type ArticleSecretSectionProps = {
  id: string
}

export const QUERY_SECRET = gql`
  query ArticleSecret($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        access {
          secret
        }
      }
    }
  }
`

const ArticleSecretSection: React.FC<ArticleSecretSectionProps> = ({ id }) => {
  const { data, loading, error } = useQuery<ArticleSecret>(QUERY_SECRET, {
    variables: { id },
  })
  const article = data?.article as ArticleSecret_article_Article
  const secret = article?.access?.secret // || 'default-no-secret'

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
            <IconLocked24 size="md" />
            <input
              type="text"
              value={secret}
              readOnly
              onClick={(event) => event.currentTarget.select()}
            />
            <CopyToClipboard text={secret}>
              <Button>
                <IconCopy16 />
              </Button>
            </CopyToClipboard>
          </section>
        </>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

export default ArticleSecretSection
