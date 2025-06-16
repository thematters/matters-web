import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconEdit from '@/public/static/icons/24px/edit.svg'
import { MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'
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
  TranslationModel,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'
import TranslationButton from './TranslationButton'

type MetaInfoProps = {
  article: MetaInfoArticleFragment
  version?: MetaInfoArticleVersionFragment
  translated: boolean
  translating: boolean
  canTranslate: boolean
  toggleTranslate: () => void
  model?: TranslationModel | null
  canReadFullContent: boolean
  editable?: boolean
}

const MetaInfo = ({
  article,
  version,
  translated,
  translating,
  canTranslate,
  toggleTranslate,
  model,
  canReadFullContent,
  editable,
}: MetaInfoProps) => {
  const viewer = useContext(ViewerContext)
  const authorId = article.author.id
  const isAuthor = viewer.id === authorId
  const originalLanguage = article?.language ? article.language : ''
  const editPath = toPath({ page: 'articleEdit', article })
  const isExceedRevision = article.revisionCount >= MAX_ARTICLE_REVISION_COUNT

  const { router, isInPath } = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { shortHash, ...qs } = router.query
  const isInArticleDetailHistory = isInPath('ARTICLE_DETAIL_HISTORY')

  const path = toPath({
    page: 'articleHistory',
    article,
    search: qs as { [key: string]: string },
  }).href

  return (
    <section className={styles.info}>
      <section className={styles.author}>
        <UserDigest.Mini
          user={article.author}
          avatarSize={20}
          textSize={12}
          nameColor="greyDarker"
          hasAvatar
          hasDisplayName
        />
        <section className={styles.dot}>
          <DotDivider />
        </section>
      </section>

      <section className={styles.time}>
        <DateTime
          date={
            isInArticleDetailHistory ? version?.createdAt : article.createdAt
          }
          size="xs"
          color="greyDarker"
        />

        {!version && article?.revisionCount > 0 && (
          <span>
            <Button
              textColor="greyDarker"
              textActiveColor="black"
              href={path}
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'edited',
                  pageType: 'article_detail',
                  pageComponent: 'article_meta',
                })
              }}
            >
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
          <Button
            textColor="black"
            textActiveColor="greyDarker"
            href={path}
            onClick={() => {
              analytics.trackEvent('click_button', {
                type: 'ipfs',
                pageType: 'article_detail',
                pageComponent: 'article_meta',
              })
            }}
          >
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
                translating={translating}
                toggleTranslate={toggleTranslate}
                originalLanguage={originalLanguage}
                model={model}
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
                  onClick={() => {
                    analytics.trackEvent('click_button', {
                      type: 'edit',
                      pageType: 'article_detail',
                      pageComponent: 'article_meta',
                    })
                  }}
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
