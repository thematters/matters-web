import { DateTime, IconPaywall24, Translate } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import FingerprintButton from './FingerprintButton'
import { fragments } from './gql'
import styles from './styles.module.css'
import TranslationButton from './TranslationButton'

type MetaInfoProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  canTranslate: boolean
  toggleTranslate: () => any
  canReadFullContent: boolean
}

const MetaInfo = ({
  article,
  translated,
  canTranslate,
  toggleTranslate,
  canReadFullContent,
}: MetaInfoProps) => {
  const originalLanguage = article?.language ? article.language : ''

  return (
    <section className={styles.info}>
      <section className={styles.time}>
        <DateTime date={article.createdAt} />
        {article.revisedAt && (
          <span className={styles.edited}>
            <Translate
              zh_hant="（編輯過）"
              zh_hans="（编辑过）"
              en=" (edited)"
            />
          </span>
        )}
      </section>

      {canReadFullContent && (
        <>
          {canTranslate && (
            <TranslationButton
              translated={translated}
              toggleTranslate={toggleTranslate}
              originalLanguage={originalLanguage}
            />
          )}
          <FingerprintButton article={article} />
        </>
      )}

      {article.access.type === 'paywall' && <IconPaywall24 color="grey" />}
    </section>
  )
}

MetaInfo.fragments = fragments

export default MetaInfo
