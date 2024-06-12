import 'photoswipe/dist/photoswipe.css'

import { FormattedMessage } from 'react-intl'
import { Gallery, Item } from 'react-photoswipe-gallery'

import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { toPath } from '~/common/utils'
import {
  Avatar,
  DateTime,
  Icon,
  InfiniteScroll,
  LinkWrapper,
  List,
  ResponsiveImage,
  ThreadCommentBeta,
  ThreadCommentType,
} from '~/components'

import styles from './styles.module.css'

interface JournalDetailDialogContentProps {
  journalId: string
  closeDialog: () => void
}

const JournalDetailDialogContent = ({
  journalId,
  closeDialog,
}: JournalDetailDialogContentProps) => {
  const options = {
    padding: { top: 20, bottom: 40, left: 100, right: 100 },
  }

  // Mock fetch data
  const data = {
    journal: {
      id: journalId,
      createdAt: '2021-10-19T07:00:00Z',
      content: 'Journal Content',
      author: {
        id: 'VXNlcjozNzAz',
        userName: 'bt20221019',
        displayName: 'matty ',
        status: {
          state: 'active',
          __typename: 'UserStatus' as any,
        },
        avatar: null,
        liker: {
          civicLiker: false,
          __typename: 'Liker' as any,
        },
        info: {
          badges: null,
          __typename: 'UserInfo' as any,
          cryptoWallet: {
            id: 'Q3J5cHRvV2FsbGV0OjM3MDM',
            address: '0xdfb823bac15ec45e975e9ca7a546570b36717d20',
            hasNFTs: false,
            __typename: 'CryptoWallet' as any,
          },
        },
        __typename: 'User' as any,
        isBlocked: false,
      },
      assets: [
        {
          id: 'QXNzZXQ6MzYwMzoxNjIw',
          type: 'journal',
          __typename: 'Asset',
          path: 'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/non-prod/embed/572e8b5a-3cce-4c97-8322-d3c6da57cb67.jpeg/w=1376,h=5504,fit=scale-down',
          src: 'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/non-prod/embed/572e8b5a-3cce-4c97-8322-d3c6da57cb67.jpeg/w=1376,h=5504,fit=scale-down',
          width: 1376 * 0.1,
          height: 5504 * 0.1,
        },
        {
          id: 'QXNzZXQ6MzYwMzoxNjIx',
          type: 'journal',
          __typename: 'Asset',
          path: 'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/non-prod/embed/f0a7389e-e3c1-40df-b092-743a5cc5ffe9.jpeg/w=1376,h=5504,fit=scale-down',
          src: 'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/non-prod/embed/f0a7389e-e3c1-40df-b092-743a5cc5ffe9.jpeg/w=1376,h=5504,fit=scale-down',
          width: 1376 * 0.1,
          height: 5504 * 0.1,
        },
      ],
      comments: [
        {
          id: 'Q29tbWVudDozNDA1MQ',
          type: 'article',
          author: {
            id: 'VXNlcjozNjgy',
            userName: 'matterstown007',
            displayName: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            status: {
              state: 'active' as any,
              __typename: 'UserStatus' as any,
            },
            avatar:
              'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/non-prod/avatar/26b03d7a-297c-491e-9114-1d7324bf3ba2.jpeg/public',
            liker: {
              civicLiker: false,
              __typename: 'Liker' as any,
            },
            info: {
              badges: null,
              __typename: 'UserInfo' as any,
              cryptoWallet: null,
            },
            __typename: 'User' as any,
            isBlocked: false,
          },
          createdAt: '2024-06-11T08:48:58.174Z',
          replyTo: null,
          fromDonator: false,
          node: {
            id: 'QXJ0aWNsZToyMjM2Mw',
            author: {
              id: 'VXNlcjozNjgy',
              __typename: 'User' as any,
              isBlocking: false,
            },
            __typename: 'Article',
            shortHash: 'c5js3s0inrqm',
            pinCommentLeft: 3,
          },
          __typename: 'Comment' as any,
          pinned: false,
          state: 'active' as any,
          parentComment: null,
          upvotes: 0,
          content: '<p>这是Journal评论</p>',
          comments: {
            pageInfo: {
              startCursor: null,
              endCursor: null,
              hasNextPage: false,
              __typename: 'PageInfo' as any,
            },
            edges: [],
            __typename: 'CommentConnection' as any,
          },
          myVote: null,
        },
        {
          id: 'Q29tbWVudDozNDA1MQ',
          type: 'article',
          author: {
            id: 'VXNlcjozNjgy',
            userName: 'matterstown007',
            displayName: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            status: {
              state: 'active' as any,
              __typename: 'UserStatus' as any,
            },
            avatar:
              'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/non-prod/avatar/26b03d7a-297c-491e-9114-1d7324bf3ba2.jpeg/public',
            liker: {
              civicLiker: false,
              __typename: 'Liker' as any,
            },
            info: {
              badges: null,
              __typename: 'UserInfo' as any,
              cryptoWallet: null,
            },
            __typename: 'User' as any,
            isBlocked: false,
          },
          createdAt: '2024-06-11T08:48:58.174Z',
          replyTo: null,
          fromDonator: false,
          node: {
            id: 'QXJ0aWNsZToyMjM2Mw',
            author: {
              id: 'VXNlcjozNjgy',
              __typename: 'User' as any,
              isBlocking: false,
            },
            __typename: 'Article',
            shortHash: 'c5js3s0inrqm',
            pinCommentLeft: 3,
          },
          __typename: 'Comment' as any,
          pinned: false,
          state: 'active' as any,
          parentComment: null,
          upvotes: 0,
          content:
            '<p>看完才知道你们闯了这么关。<br class="smart">可以说是跌宕起伏了，真是不容易。<br class="smart">感觉其中哪个环节出错都走不了。加油！</p>',
          comments: {
            pageInfo: {
              startCursor: null,
              endCursor: null,
              hasNextPage: false,
              __typename: 'PageInfo' as any,
            },
            edges: [],
            __typename: 'CommentConnection' as any,
          },
          myVote: null,
        },
        {
          id: 'Q29tbWVudDozNDA1MQ',
          type: 'article',
          author: {
            id: 'VXNlcjozNjgy',
            userName: 'matterstown007',
            displayName: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            status: {
              state: 'active' as any,
              __typename: 'UserStatus' as any,
            },
            avatar:
              'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/non-prod/avatar/26b03d7a-297c-491e-9114-1d7324bf3ba2.jpeg/public',
            liker: {
              civicLiker: false,
              __typename: 'Liker' as any,
            },
            info: {
              badges: null,
              __typename: 'UserInfo' as any,
              cryptoWallet: null,
            },
            __typename: 'User' as any,
            isBlocked: false,
          },
          createdAt: '2024-06-11T08:48:58.174Z',
          replyTo: null,
          fromDonator: false,
          node: {
            id: 'QXJ0aWNsZToyMjM2Mw',
            author: {
              id: 'VXNlcjozNjgy',
              __typename: 'User' as any,
              isBlocking: false,
            },
            __typename: 'Article',
            shortHash: 'c5js3s0inrqm',
            pinCommentLeft: 3,
          },
          __typename: 'Comment' as any,
          pinned: false,
          state: 'active' as any,
          parentComment: null,
          upvotes: 0,
          content: '<p>这是Journal评论</p>',
          comments: {
            pageInfo: {
              startCursor: null,
              endCursor: null,
              hasNextPage: false,
              __typename: 'PageInfo' as any,
            },
            edges: [],
            __typename: 'CommentConnection' as any,
          },
          myVote: null,
        },
        {
          id: 'Q29tbWVudDozNDA1MQ',
          type: 'article',
          author: {
            id: 'VXNlcjozNjgy',
            userName: 'matterstown007',
            displayName: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            status: {
              state: 'active' as any,
              __typename: 'UserStatus' as any,
            },
            avatar:
              'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/non-prod/avatar/26b03d7a-297c-491e-9114-1d7324bf3ba2.jpeg/public',
            liker: {
              civicLiker: false,
              __typename: 'Liker' as any,
            },
            info: {
              badges: null,
              __typename: 'UserInfo' as any,
              cryptoWallet: null,
            },
            __typename: 'User' as any,
            isBlocked: false,
          },
          createdAt: '2024-06-11T08:48:58.174Z',
          replyTo: null,
          fromDonator: false,
          node: {
            id: 'QXJ0aWNsZToyMjM2Mw',
            author: {
              id: 'VXNlcjozNjgy',
              __typename: 'User' as any,
              isBlocking: false,
            },
            __typename: 'Article',
            shortHash: 'c5js3s0inrqm',
            pinCommentLeft: 3,
          },
          __typename: 'Comment' as any,
          pinned: false,
          state: 'active' as any,
          parentComment: null,
          upvotes: 0,
          content:
            '<p>看完才知道你们闯了这么关。<br class="smart">可以说是跌宕起伏了，真是不容易。<br class="smart">感觉其中哪个环节出错都走不了。加油！</p>',
          comments: {
            pageInfo: {
              startCursor: null,
              endCursor: null,
              hasNextPage: false,
              __typename: 'PageInfo' as any,
            },
            edges: [],
            __typename: 'CommentConnection' as any,
          },
          myVote: null,
        },
      ],
    },
  }

  const { journal } = data
  const { author, content, assets, comments } = journal

  const userProfilePath = toPath({
    page: 'userProfile',
    userName: author.userName || '',
  })
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <section className={styles.left}>
          <section className={styles.author}>
            <LinkWrapper {...userProfilePath}>
              <Avatar user={author} />
            </LinkWrapper>
            <section className={styles.info}>
              <section className={styles.top}>
                <LinkWrapper {...userProfilePath}>
                  <section className={styles.displayName}>
                    {author.displayName}
                  </section>
                </LinkWrapper>
                {/* <RoleLabel comment={comment} /> */}
              </section>
              {/* <LinkWrapper {...commentDetailPath}> */}
              <DateTime date={journal.createdAt} color="grey" />
              {/* </LinkWrapper> */}
            </section>
          </section>
        </section>
        <section className={styles.right}>
          {/* Close Button */}
          <button>
            <Icon icon={IconTimes} onClick={closeDialog} size={22} />
          </button>
        </section>
      </header>
      <section className={styles.scrollContainer}>
        <section className={styles.mainContent}>
          <section>{content}</section>
          {assets.length > 0 && (
            <section className={styles.assets}>
              <Gallery options={options}>
                {assets.map((asset) => (
                  <Item
                    key={asset.id}
                    original={asset.src}
                    thumbnail={asset.src}
                    width={asset.width}
                    height={asset.height}
                  >
                    {({ ref, open }) => (
                      <div ref={ref} onClick={open} className={styles.item}>
                        <ResponsiveImage
                          url={asset.src}
                          // url={
                          //   'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/embed/c768fc54-92d3-4aea-808e-a668b903fc62.png/w=212,h=212,fit=crop,anim=false'
                          // }
                          width={106}
                          height={106}
                          smUpWidth={106}
                          smUpHeight={106}
                        />
                      </div>
                    )}
                  </Item>
                ))}
              </Gallery>
            </section>
          )}
        </section>
        <section className={styles.comments}>
          <section className={styles.title}>
            <span>評論</span>
            <span className={styles.count}>&nbsp;2</span>
          </section>
          <InfiniteScroll
            // hasNextPage={pageInfo.hasNextPage}
            // loadMore={loadMore}
            hasNextPage={false}
            loadMore={async () => {}}
            loader={
              <>
                {/* <Placeholder />
            <Spacer size="loose" /> */}
              </>
            }
            eof={
              <FormattedMessage
                defaultMessage="No more comments"
                description="src/views/ArticleDetail/Comments/LatestComments/index.tsx"
                id="9SXN7s"
              />
            }
            eofSpacingTop="base"
          >
            <List spacing={[0, 0]} hasBorder={false}>
              {comments.map(
                (comment) =>
                  !comment.pinned &&
                  comment.state !== 'archived' && (
                    <List.Item key={comment.id}>
                      <ThreadCommentBeta
                        comment={comment as ThreadCommentType}
                        type="article"
                        hasLink
                      />
                    </List.Item>
                  )
              )}
            </List>
          </InfiniteScroll>
        </section>
      </section>
      <footer className={styles.footer}>
        <button
          className={styles.likeButton}
          onClick={() => {
            console.log('like')
          }}
        >
          <Icon icon={IconLike} size={22} />
        </button>
        <button onClick={() => {}} className={styles.activeButton}>
          <FormattedMessage defaultMessage="說點什麼..." id="EIoAY7" />
        </button>
      </footer>
    </section>
  )
}

export default JournalDetailDialogContent
