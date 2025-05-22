import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { LanguageContext, TextIcon, useRoute } from '~/components'
import { StateArticleFragment, UserLanguage } from '~/gql/graphql'

import styles from './styles.module.css'

type StickyTopBannerProps = {
  type: 'inactive' | 'revision'
  article: StateArticleFragment
}

const fragments = {
  article: gql`
    fragment StateArticle on Article {
      id
      state
      slug
      shortHash
      author {
        id
        userName
      }
    }
  `,
}

const InactiveBanner = ({ article }: Omit<StickyTopBannerProps, 'type'>) => {
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
            defaultMessage="Archived for violation."
            id="Z7JXlF"
            description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
          />
        )}
        {isArchived && (
          <FormattedMessage
            defaultMessage="Archived article."
            id="1PORwh"
            description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
          />
        )}
      </span>
      {lang === UserLanguage.En && <>&nbsp;</>}
      <Link href={PATHS.ME_ARCHIVED} legacyBehavior>
        <a>
          <TextIcon decoration="underline" size={16} weight="semibold">
            <FormattedMessage
              defaultMessage="Back to my works"
              id="HR599l"
              description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
            />
          </TextIcon>
        </a>
      </Link>
      <style global jsx>{`
        body {
          margin-top: 42px;
        }
      `}</style>
    </section>
  )
}

const RevisionBanner = ({ article }: Omit<StickyTopBannerProps, 'type'>) => {
  const { lang } = useContext(LanguageContext)
  const { router } = useRoute()
  const { shortHash, v, ...qs } = router.query

  const path = toPath({
    page: 'articleDetail',
    article,
    search: qs as { [key: string]: string }, // forward qs back to detail page
  })

  return (
    <section className={classNames([styles.container, styles.revision])}>
      <span>
        <FormattedMessage
          defaultMessage="Revision history and IPFS entry,"
          id="FMIIAZ"
          description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
        />
      </span>
      {lang === 'en' && <span>&nbsp;</span>}
      <Link {...path} legacyBehavior>
        <a>
          <TextIcon decoration="underline" size={16} weight="medium">
            <FormattedMessage
              defaultMessage="back to latest"
              id="imXsmo"
              description="src/views/ArticleDetail/StickyTopBanner/index.tsx"
            />
          </TextIcon>
        </a>
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
    return <RevisionBanner article={article} />
  }

  return null
}

StickyTopBanner.fragments = fragments

export default StickyTopBanner
