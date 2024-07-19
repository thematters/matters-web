import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconDot } from '@/public/static/icons/dot.svg'
import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
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
    router.push(momentDetailPath.href)
  }

  const Container = ({
    openMomentDetail,
  }: {
    openMomentDetail: () => void
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
          <LinkWrapper {...momentDetailPath}>
            <DateTime date={createdAt} color="grey" />
          </LinkWrapper>
        </header>
        {!!content && (
          <section
            className={styles.content}
            onClick={() => {
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
                dangerouslySetInnerHTML={{
                  __html: content || '',
                }}
              />
            </Expandable>
          </section>
        )}
        {!!assets && assets.length > 0 && <Assets moment={moment} />}
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
      <Media at="sm">
        <Container openMomentDetail={goToMomentDetail} />
      </Media>
      <Media greaterThan="sm">
        <MomentDetailDialog shortHash={moment.shortHash}>
          {({ openDialog }) => <Container openMomentDetail={openDialog} />}
        </MomentDetailDialog>
      </Media>
    </>
  )
}

MomentDigestFeed.fragments = fragments
