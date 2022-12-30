import { DateTime, IconPaywall16, Translate } from '~/components'

import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
import FingerprintButton from './FingerprintButton'
import { fragments } from './gql'
import styles from './styles.css'
import TranslationButton from './TranslationButton'

type MetaInfoProps = {
  article: ArticleDetailPublic_article
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
    <section className="info">
      <section className="time">
        <DateTime date={article.createdAt} />
        {article.revisedAt && (
          <span>
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

      {article.access.type === 'paywall' && <IconPaywall16 color="grey" />}

      <style jsx>{styles}</style>
    </section>
  )
}

MetaInfo.fragments = fragments

export default MetaInfo
