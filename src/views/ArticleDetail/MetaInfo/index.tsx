import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconEdit } from '@/public/static/icons/24px/edit.svg'
import { MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Button,
  DateTime,
  DotDivider,
  Icon,
  TextIcon,
  UserDigest,
  useRoute,
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
  const editPath = toPath({ page: 'articleEdit', article })
  const isExceedRevision = article.revisionCount >= MAX_ARTICLE_REVISION_COUNT

  const { router } = useRoute()
  const { shortHash, ...qs } = router.query

  const path = toPath({
    page: 'articleHistory',
    article,
    search: qs as { [key: string]: string },
  }).href

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

        {!version && article?.revisionCount > 0 && (
          <span>
            <Button textColor="greyDarker" textActiveColor="black" href={path}>
              <span className={styles.edited}>
                <FormattedMessage defaultMessage=" (edited) " id="7oytv9" />
              </span>
            </Button>
          </span>
        )}
      </section>

      {!version && (
        <>
          <section className={styles.dot}>
            <DotDivider />
          </section>
          <Button textColor="black" textActiveColor="greyDarker" href={path}>
            <TextIcon size={12}>IPFS</TextIcon>
          </Button>
        </>
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

              {isExceedRevision ? (
                <TextIcon
                  icon={<Icon icon={IconEdit} />}
                  size={12}
                  color="grey"
                >
                  <FormattedMessage
                    defaultMessage="Used up edit quota"
                    id="NFIbLb"
                  />
                </TextIcon>
              ) : (
                <Button
                  textColor="black"
                  textActiveColor="greyDarker"
                  href={editable ? editPath.href : undefined}
                  disabled={!editable}
                >
                  <TextIcon icon={<Icon icon={IconEdit} />} size={12}>
                    <FormattedMessage
                      defaultMessage="Edit"
                      id="2bG/gP"
                      description="src/views/ArticleDetail/MetaInfo/index.tsx"
                    />
                  </TextIcon>
                </Button>
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}

MetaInfo.fragments = fragments

export default MetaInfo
