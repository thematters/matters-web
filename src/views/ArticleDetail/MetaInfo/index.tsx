import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { URL_QS } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Button,
  DateTime,
  DotDivider,
  IconEdit16,
  Media,
  TextIcon,
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
  disabled: boolean
}

const MetaInfo = ({
  article,
  translated,
  canTranslate,
  toggleTranslate,
  canReadFullContent,
  disabled,
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
        <span className={styles.edited}>
          &nbsp;
          <FormattedMessage
            defaultMessage="published on"
            id="1i2T4a"
            description="src/views/ArticleDetail/MetaInfo/index.tsx"
          />
        </span>
      </section>
      <FingerprintButton article={article} />
      {canReadFullContent && (
        <>
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
                href={
                  !disabled
                    ? `${href}?${URL_QS.MODE_EDIT.key}=${URL_QS.MODE_EDIT.value}`
                    : undefined
                }
                disabled={disabled}
              >
                <TextIcon icon={<IconEdit16 />} size="xs">
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
    </section>
  )
}

MetaInfo.fragments = fragments

export default MetaInfo
