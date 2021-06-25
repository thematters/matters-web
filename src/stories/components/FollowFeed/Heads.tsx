import React from 'react'
import FollowHead from '~/views/Follow/FollowFeed/FollowHead'

import {
  ArticleDigestTitle,
  CircleDigest,
  Tag,
  Translate,
  UserDigest,
} from '~/components'

import { MOCK_ARTILCE, MOCK_CIRCLE, MOCK_TAG, MOCK_USER } from '../../mocks'

const Heads = () => (
  <section>
    <ul>
      <li>
        <FollowHead>
          <UserDigest.Plain user={MOCK_USER} />
          <span>
            <Translate zh_hant="發布" zh_hans="發布" />
          </span>
        </FollowHead>
      </li>
      <li>
        <FollowHead>
          <span>
            <Translate zh_hant="添加精選於" zh_hans="添加精選於" />
          </span>
          <CircleDigest.Plain circle={MOCK_CIRCLE} />
        </FollowHead>
      </li>
      <li>
        <FollowHead>
          <UserDigest.Plain user={MOCK_USER} />
          <span>
            <Translate zh_hant="關聯了作品" zh_hans="關聯了作品" />
          </span>
          <Tag tag={MOCK_TAG} type="plain" />
        </FollowHead>
      </li>
      <li>
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
      </li>
    </ul>

    <style jsx>{`
      li {
        @mixin border-bottom-grey;
        padding: var(--spacing-base);
      }
    `}</style>
  </section>
)

export default Heads
