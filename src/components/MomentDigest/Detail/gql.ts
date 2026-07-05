import gql from 'graphql-tag'

import { ArticleTag } from '~/components/Tag'
import { UserDigest } from '~/components/UserDigest'

import Assets from '../Assets'

export const fragments = {
  moment: gql`
    fragment MomentDigestDetailMoment on Moment {
      id
      createdAt
      shortHash
      state
      content
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      # alias to avoid conflict with Article.tags in union queries
      momentTags: tags {
        ...DigestTag
      }

      ...MomentDigestAssetsMoment
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleTag.fragments.tag}
    ${Assets.fragments.moment}
  `,
}
