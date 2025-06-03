import { FormattedMessage } from 'react-intl'

import IconDot from '@/public/static/icons/dot.svg'
import { TEST_ID } from '~/common/enums'
import { MOMENT_DIGEST_REFERRER } from '~/common/enums/moment'
import { captureClicks, sessionStorage, toPath } from '~/common/utils'
import {
  DateTime,
  Expandable,
  Icon,
  LinkWrapper,
  Media,
  MomentDetailDialog,
  UserDigest,
  useRoute,
} from '~/components'
import {
  MomentDigestFeedMomentPrivateFragment,
  MomentDigestFeedMomentPublicFragment,
} from '~/gql/graphql'

import Assets from '../Assets'
import FooterActions from '../FooterActions'
import { fragments } from './gql'
import styles from './styles.module.css'

export type MomentDigestFeedProps = {
  moment: MomentDigestFeedMomentPublicFragment &
    Partial<MomentDigestFeedMomentPrivateFragment>
  hasAuthor?: boolean
  hasCommentedFollowees?: boolean
}

export const MomentDigestFeed = ({
  moment,
  hasAuthor,
  hasCommentedFollowees,
}: MomentDigestFeedProps) => {
  const { content, createdAt, assets, author } = moment
  const { router } = useRoute()

  const momentDetailPath = toPath({
    page: 'momentDetail',
    moment,
  })

  const goToMomentDetail = () => {
    setReferrer()
    router.push(momentDetailPath.href)
  }

  const setReferrer = () => {
    sessionStorage.set(MOMENT_DIGEST_REFERRER, true)
  }

  const handleClickDateTime = () => {
    setReferrer()
  }

  const Container = ({
    openMomentDetail,
    hasAuthor,
  }: {
    openMomentDetail: () => void
    hasAuthor?: boolean
  }) => {
    return (
      <section className={styles.container}>
        <header className={styles.header}>
          {hasAuthor && (
            <section
              className={styles.author}
              data-test-id={TEST_ID.MOMENT_DIGEST_AUTHOR}
            >
              <UserDigest.Mini
                user={author}
                avatarSize={20}
                textSize={12}
                hasAvatar
                hasDisplayName
              />
              <Icon icon={IconDot} color="greyLight" size={20} />
            </section>
          )}
          <section>
            <LinkWrapper {...momentDetailPath} onClick={handleClickDateTime}>
              <DateTime date={createdAt} color="grey" minimal />
            </LinkWrapper>
          </section>
        </header>
        {!!content && (
          <section
            className={styles.content}
            onClick={(event) => {
              const target = event.target as HTMLElement
              const targetTagName = target.tagName.toLocaleLowerCase()
              if (
                // link
                targetTagName === 'a' ||
                // mention
                (targetTagName === 'span' &&
                  target.parentElement?.tagName.toLocaleLowerCase() === 'a' &&
                  target.innerText.includes('@'))
              ) {
                event.stopPropagation()
                return
              }
              openMomentDetail()
            }}
            data-test-id={TEST_ID.MOMENT_DIGEST_CONTENT}
          >
            <Expandable
              content={content}
              limit={4}
              isRichShow={true}
              size={15}
              collapseable={false}
              isCommentOrMoment
              expandButton={
                <button
                  onClick={() => {
                    // TODO: open moment detail dialog or navigate to moment detail page
                  }}
                >
                  <FormattedMessage
                    defaultMessage="More"
                    id="eoQN04"
                    description="src/components/MomentDigest/index.tsx"
                  />
                </button>
              }
            >
              <section
                className="u-content-moment"
                dangerouslySetInnerHTML={{
                  __html: content || '',
                }}
                onClick={captureClicks}
              />
            </Expandable>
          </section>
        )}
        {!!assets && assets.length > 0 && (
          <section className={styles.assets}>
            <Assets moment={moment} />
          </section>
        )}
        <FooterActions
          moment={moment}
          hasCommentedFollowees={hasCommentedFollowees}
          onClickReply={openMomentDetail}
        />
      </section>
    )
  }

  return (
    <>
      <Media lessThan="md">
        <Container openMomentDetail={goToMomentDetail} hasAuthor={hasAuthor} />
      </Media>
      <Media greaterThanOrEqual="md">
        <MomentDetailDialog shortHash={moment.shortHash}>
          {({ openDialog }) => (
            <Container openMomentDetail={openDialog} hasAuthor={hasAuthor} />
          )}
        </MomentDetailDialog>
      </Media>
    </>
  )
}

MomentDigestFeed.fragments = fragments
