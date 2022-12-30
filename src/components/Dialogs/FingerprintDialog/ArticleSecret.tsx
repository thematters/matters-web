import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  IconCopy16,
  IconLocked24,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

import {
  ArticleSecret,
  ArticleSecret_article_Article,
} from './__generated__/ArticleSecret'
import styles from './styles.css'

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
  const { lang } = useContext(LanguageContext)
  const { data } = useQuery<ArticleSecret>(QUERY_SECRET, {
    variables: { id },
  })
  const article = data?.article as ArticleSecret_article_Article
  const secret = article?.access?.secret

  if (!secret) {
    return null
  }

  return (
    <section className="secret">
      <p className="description">
        <Translate
          zh_hant="上鎖內容密鑰，請妥善保管"
          zh_hans="上鎖內容密鑰，請妥善保管"
          en="The key for locked content, please save securely"
        />
      </p>

      <section className="key">
        <CopyToClipboard text={secret}>
          <Button
            aria-label={translate({ id: 'copy', lang })}
            spacing={['xtight', 'base']}
            bgColor="yellow-lighter"
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

      <style jsx>{styles}</style>
    </section>
  )
}

export default ArticleSecretSection
