import React from 'react'
import FollowingFeedCircle from '~/views/Follow/Feed/FollowingFeedCircle'
import FollowingFeedComment from '~/views/Follow/Feed/FollowingFeedComment'
import FollowingFeedHead from '~/views/Follow/Feed/FollowingFeedHead'
import FollowingFeedUser from '~/views/Follow/Feed/FollowingFeedUser'

import {
  ArticleDigestFeed,
  ArticleDigestTitle,
  CircleDigest,
  List,
  Tag,
  Translate,
  UserDigest,
} from '~/components'

import {
  MOCK_ARTILCE,
  MOCK_CIRCLE,
  MOCK_COMMENT,
  MOCK_TAG,
  MOCK_USER,
} from '../../mocks'

const Heads = () => (
  <section>
    <List>
      {/* Article was published */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="發布" zh_hans="發布" />
              </span>
            </FollowingFeedHead>
          }
          hasFollow
          article={MOCK_ARTILCE}
          date={new Date()}
        />
      </List.Item>

      {/* Article was published on Circle */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="發布於" zh_hans="發布於" />
              </span>
              <CircleDigest.Plain circle={MOCK_CIRCLE} />
            </FollowingFeedHead>
          }
          hasFollow
          article={MOCK_ARTILCE}
          date={new Date()}
        />
      </List.Item>

      {/* New Broadcast */}
      <List.Item>
        <FollowingFeedComment
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="廣播於" zh_hans="廣播於" />
              </span>
              <CircleDigest.Plain circle={MOCK_CIRCLE} />
            </FollowingFeedHead>
          }
          comment={MOCK_COMMENT}
          date={new Date()}
        />
      </List.Item>

      {/* Article was published on Tag */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="發布於" zh_hans="發布於" />
              </span>
              <Tag tag={MOCK_TAG} type="plain" />
            </FollowingFeedHead>
          }
          hasFollow
          article={{
            ...MOCK_ARTILCE,
            author: {
              ...MOCK_ARTILCE.author,
              isFollowee: true,
              isFollower: true,
            },
            cover: null,
          }}
        />
      </List.Item>

      {/* Article was featured by Tag */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="收藏" zh_hans="收藏" />
              </span>
            </FollowingFeedHead>
          }
          hasFollow
          article={MOCK_ARTILCE}
        />
      </List.Item>

      {/* Article was bookmarked */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowingFeedHead>
              <span>
                <Translate zh_hant="添加精選於" zh_hans="添加精選於" />
              </span>
              <Tag tag={MOCK_TAG} type="plain" />
            </FollowingFeedHead>
          }
          hasFollow
          article={MOCK_ARTILCE}
        />
      </List.Item>

      {/* Article was donated */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="支持" zh_hans="支持" />
              </span>
            </FollowingFeedHead>
          }
          article={MOCK_ARTILCE}
        />
      </List.Item>

      {/* Circle was created */}
      <List.Item>
        <FollowingFeedCircle
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="創建" zh_hans="創建" />
              </span>
            </FollowingFeedHead>
          }
          circle={MOCK_CIRCLE}
          date={new Date()}
        />
      </List.Item>

      {/* Circle has a new subscriber */}
      <List.Item>
        <FollowingFeedCircle
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="訂閱" zh_hans="訂閱" />
              </span>
            </FollowingFeedHead>
          }
          circle={MOCK_CIRCLE}
        />
      </List.Item>

      {/* Article was collected */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="關聯了作品" zh_hans="關聯了作品" />
              </span>
              <ArticleDigestTitle
                article={MOCK_ARTILCE}
                textSize="sm-s"
                textWeight="normal"
                lineClamp
                is="h5"
              />
            </FollowingFeedHead>
          }
          hasFollow
          article={MOCK_ARTILCE}
        />
      </List.Item>

      {/* User has a new follower */}
      <List.Item>
        <FollowingFeedUser
          header={
            <FollowingFeedHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="追蹤" zh_hans="追蹤" />
              </span>
            </FollowingFeedHead>
          }
          user={MOCK_USER}
          date={new Date()}
        />
      </List.Item>
    </List>
  </section>
)

export default Heads
