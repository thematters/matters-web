import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import IconDot from '@/public/static/icons/dot.svg'
import { TEST_ID } from '~/common/enums'
import { MOMENT_DIGEST_REFERRER } from '~/common/enums/moment'
import { captureClicks, sessionStorage, toPath } from '~/common/utils'
import {
  DateTime,
  Expandable,
  Icon,
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

type ContainerProps = {
  moment: MomentDigestFeedProps['moment']
  hasAuthor?: boolean
  hasCommentedFollowees?: boolean
  openMomentDetail: () => void
}

const Container = ({
  moment,
  hasAuthor,
  hasCommentedFollowees,
  openMomentDetail,
}: ContainerProps) => {
  const { content, createdAt, assets, author } = moment

  const momentDetailPath = toPath({
    page: 'momentDetail',
    moment,
  })

  const setReferrer = () => {
    sessionStorage.set(MOMENT_DIGEST_REFERRER, true)
  }

  const handleClickDateTime = () => {
    setReferrer()
  }

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
          <Link {...momentDetailPath} onClick={handleClickDateTime}>
            <DateTime date={createdAt} color="grey" minimal />
          </Link>
        </section>
      </header>
      {!!content && (
        <section
          className={styles.content}
          onClick={(event) => {
            const target = event.target as HTMLElement
            const targetTagName = target.tagName.toLowerCase()
            if (
              // link
              targetTagName === 'a' ||
              // mention
              (targetTagName === 'span' &&
                target.parentElement?.tagName.toLowerCase() === 'a' &&
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

const BaseMomentDigestFeed = ({
  moment,
  hasAuthor,
  hasCommentedFollowees,
}: MomentDigestFeedProps) => {
  const { router } = useRoute()

  const momentDetailPath = toPath({
    page: 'momentDetail',
    moment,
  })

  const setReferrer = () => {
    sessionStorage.set(MOMENT_DIGEST_REFERRER, true)
  }

  const goToMomentDetail = () => {
    setReferrer()
    router.push(momentDetailPath.href)
  }

  return (
    <>
      <Media lessThan="md">
        <Container
          moment={moment}
          hasAuthor={hasAuthor}
          hasCommentedFollowees={hasCommentedFollowees}
          openMomentDetail={goToMomentDetail}
        />
      </Media>
      <Media greaterThanOrEqual="md">
        <MomentDetailDialog shortHash={moment.shortHash}>
          {({ openDialog }) => (
            <Container
              moment={moment}
              hasAuthor={hasAuthor}
              hasCommentedFollowees={hasCommentedFollowees}
              openMomentDetail={openDialog}
            />
          )}
        </MomentDetailDialog>
      </Media>
    </>
  )
}

type MemoizedMomentDigestFeed = React.MemoExoticComponent<
  React.FC<MomentDigestFeedProps>
> & {
  fragments: typeof fragments
}

export const MomentDigestFeed = React.memo(
  BaseMomentDigestFeed,
  ({ moment: prev }, { moment: next }) =>
    prev.liked === next.liked &&
    prev.likeCount === next.likeCount &&
    prev.commentCount === next.commentCount &&
    prev.state === next.state
) as MemoizedMomentDigestFeed

MomentDigestFeed.fragments = fragments
