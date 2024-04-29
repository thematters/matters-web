import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconEdit } from '@/public/static/icons/24px/edit.svg'
import { toPath } from '~/common/utils'
import {
  Button,
  DateTime,
  DotDivider,
  Icon,
  TextIcon,
  UserDigest,
  ViewerContext,
} from '~/components'
import {
  MetaInfoArticleFragment,
  MetaInfoArticleVersionFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'
import TranslationButton from './TranslationButton'

type MetaInfoProps = {
  article: MetaInfoArticleFragment
  version?: MetaInfoArticleVersionFragment
  translated: boolean
  canTranslate: boolean
  toggleTranslate: () => any
  canReadFullContent: boolean
  editable?: boolean
}

const MetaInfo = ({
  article,
  version,
  translated,
  canTranslate,
  toggleTranslate,
  canReadFullContent,
  editable,
}: MetaInfoProps) => {
  const viewer = useContext(ViewerContext)
  const authorId = article.author.id
  const isAuthor = viewer.id === authorId
  const originalLanguage = article?.language ? article.language : ''
  const { href } = toPath({ page: 'articleDetail', article })

  return (
    <section className={styles.info}>
      {/* TODO: Confirm display word length with product */}
      <section className={styles.author}>
        <UserDigest.Plain user={article.author} />
        <section className={styles.dot}>
          <DotDivider />
        </section>
      </section>

      <section className={styles.time}>
        <DateTime
          date={version?.createdAt || article.revisedAt || article.createdAt}
          size="xs"
          color="greyDarker"
        />
        <span>
          {version?.createdAt ? (
            <FormattedMessage defaultMessage=" published" id="twEps9" />
          ) : (
            <FormattedMessage defaultMessage=" published on" id="ux4p3j" />
          )}
        </span>
      </section>

      {!version && (
        <Button
          textColor="black"
          textActiveColor="greyDarker"
          href={
            toPath({
              page: 'articleHistory',
              article,
            }).href
          }
        >
          <TextIcon size="xs">IPFS</TextIcon>
        </Button>
      )}

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

          {isAuthor && !version && (
            <>
              <section className={styles.dot}>
                <DotDivider />
              </section>

              <Button
                textColor="black"
                textActiveColor="greyDarker"
                href={editable ? `${href}/edit` : undefined}
                disabled={!editable}
              >
                <TextIcon icon={<Icon icon={IconEdit} />} size="xs">
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
