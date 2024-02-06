import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { LanguageContext, TextIcon } from '~/components'
import { StateArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

type StickyTopBannerProps = {
  type: 'inactive' | 'revision'
  article?: StateArticleFragment
}

type InactiveBannerProps = {
  article: StateArticleFragment
}

const fragments = {
  article: gql`
    fragment StateArticle on Article {
      state
    }
  `,
}

const InactiveBanner = ({ article }: InactiveBannerProps) => {
  const { lang } = useContext(LanguageContext)

  const isBanned = article.state === 'banned'
  const isArchived = article.state === 'archived'

  if (article.state === 'active') {
    return null
  }

  return (
    <section className={styles.container}>
      <span>
        {isBanned && (
          <FormattedMessage
            defaultMessage="Archived article (violations),"
            id="+GCcXH"
            description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
          />
        )}
        {isArchived && (
          <FormattedMessage
            defaultMessage="Archived article (Author),"
            id="L5guA9"
            description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
          />
        )}
      </span>

      {lang === 'en' && <span>&nbsp;</span>}

      <Link href={PATHS.ME_ARCHIVED}>
        <TextIcon textDecoration="underline" size="md" weight="semibold">
          <FormattedMessage
            defaultMessage="back to my works"
            id="DDQsyP"
            description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
          />
        </TextIcon>
      </Link>

      <style global jsx>{`
        body {
          margin-top: 42px;
        }
      `}</style>
    </section>
  )
}

const RevisionBanner = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <section className={styles.container}>
      <span>
        <FormattedMessage
          defaultMessage="Revision history and IPFS entry,"
          id="FMIIAZ"
          description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
        />
      </span>

      {lang === 'en' && <span>&nbsp;</span>}

      <Link href={PATHS.ME_ARCHIVED}>
        <TextIcon textDecoration="underline" size="md" weight="semibold">
          <FormattedMessage
            defaultMessage="back to latest"
            id="imXsmo"
            description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
          />
        </TextIcon>
      </Link>

      <style global jsx>{`
        body {
          margin-top: 42px;
        }
      `}</style>
    </section>
  )
}

const StickyTopBanner = ({ type, article }: StickyTopBannerProps) => {
  if (type === 'inactive' && article) {
    return <InactiveBanner article={article} />
  }

  if (type === 'revision') {
    return <RevisionBanner />
  }

  return null
}

StickyTopBanner.fragments = fragments

export default StickyTopBanner
