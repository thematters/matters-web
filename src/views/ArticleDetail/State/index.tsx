import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { LanguageContext, LinkWrapper, TextIcon } from '~/components'
import { StateArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  article: gql`
    fragment StateArticle on Article {
      state
    }
  `,
}

const State = ({ article }: { article: StateArticleFragment }) => {
  const isBanned = article.state === 'banned'
  const isArchived = article.state === 'archived'
  const { lang } = useContext(LanguageContext)

  if (article.state === 'active') {
    return null
  }

  return (
    <section className={styles.container}>
      <span>
        {isBanned && (
          <FormattedMessage
            defaultMessage="Archived article (violations),"
            id="HaSYl4"
            description="src/views/ArticleDetail/State/index.tsx"
          />
        )}
        {isArchived && (
          <FormattedMessage
            defaultMessage="Archived article (Author),"
            id="9FQN4+"
            description="src/views/ArticleDetail/State/index.tsx"
          />
        )}
      </span>
      {lang === 'en' && <span>&nbsp;</span>}
      <LinkWrapper href={PATHS.ME_ARCHIVED}>
        <TextIcon textDecoration="underline" size="md" weight="semibold">
          <FormattedMessage
            defaultMessage="Back to my works"
            id="J12iSN"
            description="src/views/ArticleDetail/State/index.tsx"
          />
        </TextIcon>
      </LinkWrapper>
      <style global jsx>{`
        div[data-reactroot] {
          margin-top: 42px;
        }
      `}</style>
    </section>
  )
}

State.fragments = fragments

export default State
