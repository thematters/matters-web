import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { URL_QS } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Button,
  DateTime,
  DotDivider,
  IconEdit16,
  IconPaywall24,
  Media,
  TextIcon,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'
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
  const viewer = useContext(ViewerContext)
  const authorId = article.author.id
  const isAuthor = viewer.id === authorId
  const originalLanguage = article?.language ? article.language : ''
  const { href } = toPath({ page: 'articleDetail', article })

  return (
    <section className={styles.info}>
      <Media at="sm">
        {/* TODO: Confirm display word length with product */}
        <section className={styles.author}>
          <UserDigest.Plain user={article.author} />
          <section className={styles.dot}>
            <DotDivider />
          </section>
        </section>
      </Media>

      <section className={styles.time}>
        <DateTime
          date={article.revisedAt ? article.revisedAt : article.createdAt}
          size="xs"
          color="greyDarker"
        />
        {article.revisedAt && (
          <span className={styles.edited}>
            <Translate zh_hant="更新於" zh_hans="更新于" en=" published on" />
          </span>
        )}
      </section>

      {canReadFullContent && (
        <>
          <FingerprintButton article={article} />

          {canTranslate && !isAuthor && (
            <>
              <section className={styles.dot}>
                <DotDivider />
              </section>

              <TranslationButton
                translated={translated}
                toggleTranslate={toggleTranslate}
                originalLanguage={originalLanguage}
              />
            </>
          )}
          {isAuthor && (
            <>
              <section className={styles.dot}>
                <DotDivider />
              </section>

              <Button
                textColor="black"
                textActiveColor="greyDarker"
                href={`${href}?${URL_QS.MODE_EDIT.key}=${URL_QS.MODE_EDIT.value}`}
              >
                <TextIcon icon={<IconEdit16 />}>
                  <FormattedMessage
                    defaultMessage="Edit"
                    id="2bG/gP"
                    description="src/views/ArticleDetail/MetaInfo/index.tsx"
                  />
                </TextIcon>
              </Button>
            </>
          )}
        </>
      )}

      {article.access.type === 'paywall' && <IconPaywall24 color="grey" />}
    </section>
  )
}

MetaInfo.fragments = fragments

export default MetaInfo
