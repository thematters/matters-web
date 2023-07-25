import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import {
  Button,
  CopyToClipboard,
  IconCopy16,
  IconLocked24,
  TextIcon,
  Translate,
} from '~/components'
import { ArticleSecretQuery } from '~/gql/graphql'

import styles from './styles.module.css'

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
  const intl = useIntl()
  const { data } = useQuery<ArticleSecretQuery>(QUERY_SECRET, {
    variables: { id },
  })
  const article = data?.article
  const secret =
    article?.__typename === 'Article' ? article?.access?.secret : undefined

  if (!secret) {
    return null
  }

  return (
    <section className={styles.secret}>
      <p className={styles.description}>
        <Translate
          zh_hant="上鎖內容密鑰，請妥善保管"
          zh_hans="上鎖內容密鑰，請妥善保管"
          en="The key for locked content, please save securely"
        />
      </p>

      <section className={styles.key}>
        <CopyToClipboard text={secret}>
          <Button
            aria-label={intl.formatMessage({ defaultMessage: 'Copy' })}
            spacing={['xtight', 'base']}
            bgColor="yellowLighter"
          >
            <TextIcon icon={<IconLocked24 size="md" />} spacing="xxtight">
              <TextIcon
                icon={<IconCopy16 />}
                textPlacement="left"
                spacing="xtight"
              >
                {secret.slice(0, 3)}...{secret.slice(-2)}
              </TextIcon>
            </TextIcon>
          </Button>
        </CopyToClipboard>
      </section>
    </section>
  )
}

export default ArticleSecretSection
