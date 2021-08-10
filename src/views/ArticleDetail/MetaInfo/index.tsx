import { DateTime, IconPaywall16, Translate } from '~/components'

import FingerprintButton from './FingerprintButton'
import { fragments } from './gql'
import styles from './styles.css'
import TranslationButton from './TranslationButton'

import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'

type MetaInfoProps = {
  article: ArticleDetailPublic_article
  translated: boolean
  shouldTranslate: boolean
  toggleTranslate: () => any
  canReadFullContent: boolean
}

const MetaInfo = ({
  article,
  translated,
  shouldTranslate,
  toggleTranslate,
  canReadFullContent,
}: MetaInfoProps) => {
  return (
    <section className="info">
      <section className="time">
        <span>
          <Translate zh_hant="發布於" zh_hans="發布於" en="Published at" />
        </span>
        <DateTime date={article.createdAt} />
      </section>

      {article.revisedAt && (
        <section className="time">
          <span>
            <Translate zh_hant="修訂於" zh_hans="修訂於" en="Revised at" />
          </span>
          <DateTime date={article.revisedAt} />
        </section>
      )}

      {canReadFullContent && (
        <>
          <FingerprintButton article={article} />

          {shouldTranslate && (
            <TranslationButton
              translated={translated}
              toggleTranslate={toggleTranslate}
            />
          )}
        </>
      )}

      {article.access.type === 'paywall' && <IconPaywall16 color="grey" />}

      <style jsx>{styles}</style>
    </section>
  )
}

MetaInfo.fragments = fragments

export default MetaInfo
