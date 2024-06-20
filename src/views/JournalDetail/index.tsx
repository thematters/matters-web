import 'photoswipe/dist/photoswipe.css'

import { Editor } from '@matters/matters-editor'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Gallery, Item } from 'react-photoswipe-gallery'

import { ReactComponent as IconLike } from '@/public/static/icons/24px/like.svg'
import { ReactComponent as IconLikeFill } from '@/public/static/icons/24px/like-fill.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { ADD_JOURNAL_COMMENT } from '~/common/enums'
import { storage, toPath } from '~/common/utils'
import {
  Avatar,
  Button,
  DateTime,
  EmptyComment,
  Icon,
  InfiniteScroll,
  JournalCommentForm,
  LinkWrapper,
  List,
  ResponsiveImage,
  ThreadCommentType,
  useEventListener,
  useRoute,
  ViewerContext,
} from '~/components'
import JournalCommentFeed from '~/components/CommentBeta/JournalCommentFeed'
import { JournalDigestProps } from '~/components/JournalDigest'

import styles from './styles.module.css'

const mockComment = {
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
}

const KEY = 'user-journals'

const JournalDetail = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery, router } = useRoute()
  const [isEditing, setEditing] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  const journalId = getQuery('id')
  const journals = storage.get(KEY) as JournalDigestProps[]
  const journal = journals.find((j) => j.id === journalId)

  const [comments] = useState<ThreadCommentType[]>([])

  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  useEventListener(ADD_JOURNAL_COMMENT, (payload: { [key: string]: any }) => {
    const input = payload?.input
    const newComment = Object.assign({}, mockComment) as ThreadCommentType
    newComment.author = viewer as any
    newComment.id = input.id
    newComment.content = input.content
    newComment.createdAt = input.createdAt
    comments.push(newComment)
  })

  useEffect(() => {
    if (editor && isEditing) {
      editor.commands.focus('end')
    }
  }, [editor, isEditing])

  if (!journal) {
    return null
  }

  const options = {
    // padding: { top: 20, bottom: 40, left: 100, right: 100 },
  }

  const { content, assets } = journal

  const userProfilePath = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  })

  const goback = () => {
    router.back()
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <section className={styles.left}>
          <section className={styles.author}>
            <LinkWrapper {...userProfilePath}>
              <Avatar user={viewer} />
            </LinkWrapper>
            <section className={styles.info}>
              <section className={styles.top}>
                <LinkWrapper {...userProfilePath}>
                  <section className={styles.displayName}>
                    {viewer.displayName}
                  </section>
                </LinkWrapper>
              </section>
              {/* <LinkWrapper {...commentDetailPath}> */}
              <DateTime date={journal.createdAt} color="grey" />
              {/* </LinkWrapper> */}
            </section>
          </section>
        </section>
        <section className={styles.right}>
          {/* Close Button */}
          <Button textColor="greyDarker" textActiveColor="black">
            <Icon icon={IconTimes} onClick={goback} size={22} />
          </Button>
        </section>
      </header>
      <section className={styles.scrollContainer}>
        <section className={styles.mainContent}>
          <section
            className={`${styles.content}`}
            dangerouslySetInnerHTML={{
              __html: content || '',
            }}
          />
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
                          objectFix="cover"
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
          {comments.length === 0 && <EmptyComment description="暫無評論" />}
          {comments.length > 0 && (
            <>
              <section className={styles.title}>
                <span>評論</span>
                <span className={styles.count}>&nbsp;{comments.length}</span>
              </section>
              <InfiniteScroll
                hasNextPage={false}
                loadMore={async () => {}}
                loader={<></>}
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
                          <JournalCommentFeed
                            comment={comment}
                            type="article"
                            hasReply
                          />
                        </List.Item>
                      )
                  )}
                </List>
              </InfiniteScroll>
            </>
          )}
        </section>
      </section>
      <footer className={styles.footer}>
        {!isEditing && (
          <>
            <div className={styles.likeButton}>
              <button
                onClick={() => {
                  toggleLike()
                }}
              >
                {isLiked && (
                  <Icon icon={IconLikeFill} size={22} color="redLight" />
                )}
                {!isLiked && <Icon icon={IconLike} size={22} />}
              </button>
              {likeCount > 0 && <span>&nbsp;{likeCount}</span>}
            </div>
            <button
              onClick={() => setEditing(true)}
              className={styles.editButton}
            >
              <FormattedMessage defaultMessage="說點什麼..." id="EIoAY7" />
            </button>
          </>
        )}
        {isEditing && (
          <JournalCommentForm
            type="journal"
            journalId={journalId}
            closeCallback={() => setEditing(false)}
            setEditor={(editor) => {
              setEditor(editor)
            }}
            submitCallback={() => setEditing(false)}
          />
        )}
      </footer>
    </section>
  )
}

export default JournalDetail
