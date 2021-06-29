import React from 'react'
import FollowHead from '~/views/Follow/FollowFeed/FollowHead'

import {
  ArticleDigestFeed,
  ArticleDigestTitle,
  CircleDigest,
  List,
  Tag,
  Translate,
  UserDigest,
} from '~/components'

import { MOCK_ARTILCE, MOCK_CIRCLE, MOCK_TAG, MOCK_USER } from '../../mocks'

const Heads = () => (
  <section>
    <List>
      {/* Article was published */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="發布" zh_hans="發布" />
              </span>
            </FollowHead>
          }
          article={MOCK_ARTILCE}
          date={new Date()}
        />
      </List.Item>

      {/* Article was published on Circle */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="發布於" zh_hans="發布於" />
              </span>
              <CircleDigest.Plain circle={MOCK_CIRCLE} />
            </FollowHead>
          }
          article={MOCK_ARTILCE}
          date={new Date()}
        />
      </List.Item>

      {/* Article was published on Tag */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="發布於" zh_hans="發布於" />
              </span>
              <Tag tag={MOCK_TAG} type="plain" />
            </FollowHead>
          }
          article={{
            ...MOCK_ARTILCE,
            author: {
              ...MOCK_ARTILCE.author,
              isFollowee: true,
              isFollower: true,
            },
          }}
        />
      </List.Item>

      {/* Article was featured by Tag */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="收藏" zh_hans="收藏" />
              </span>
            </FollowHead>
          }
          article={MOCK_ARTILCE}
        />
      </List.Item>

      {/* Article was bookmarked */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowHead>
              <span>
                <Translate zh_hant="添加精選於" zh_hans="添加精選於" />
              </span>
              <Tag tag={MOCK_TAG} type="plain" />
            </FollowHead>
          }
          article={MOCK_ARTILCE}
        />
      </List.Item>

      {/* Article was donated */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="支持" zh_hans="支持" />
              </span>
            </FollowHead>
          }
          article={MOCK_ARTILCE}
        />
      </List.Item>

      {/* Circle was created */}
      <List.Item>
        <CircleDigest.Feed
          header={
            <FollowHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="創建" zh_hans="創建" />
              </span>
            </FollowHead>
          }
          circle={MOCK_CIRCLE}
          date={new Date()}
        />
      </List.Item>

      {/* Circle has a new subscriber */}
      <List.Item>
        <CircleDigest.Feed
          header={
            <FollowHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="訂閱" zh_hans="訂閱" />
              </span>
            </FollowHead>
          }
          circle={MOCK_CIRCLE}
        />
      </List.Item>

      {/* Article was collected */}
      <List.Item>
        <ArticleDigestFeed
          header={
            <FollowHead>
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
            </FollowHead>
          }
          article={MOCK_ARTILCE}
        />
      </List.Item>

      {/* User has a new follower */}
      <List.Item>
        <UserDigest.Feed
          header={
            <FollowHead>
              <UserDigest.Plain user={MOCK_USER} />
              <span>
                <Translate zh_hant="追蹤" zh_hans="追蹤" />
              </span>
            </FollowHead>
          }
          user={MOCK_USER}
          date={new Date()}
        />
      </List.Item>
    </List>

    <style jsx>{`
      li {
        @mixin border-bottom-grey;
        padding: var(--spacing-base);
      }
    `}</style>
  </section>
)

export default Heads
