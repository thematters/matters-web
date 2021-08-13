import gql from 'graphql-tag'

import {
  IconArticle16,
  IconPrice12,
  IconUser16,
  TextIcon,
  Translate,
} from '~/components'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { FollowingFeedRecommendCircleFooterPrivate } from './__generated__/FollowingFeedRecommendCircleFooterPrivate'
import { FollowingFeedRecommendCircleFooterPublic } from './__generated__/FollowingFeedRecommendCircleFooterPublic'

type Props = {
  circle: FollowingFeedRecommendCircleFooterPublic &
    Partial<FollowingFeedRecommendCircleFooterPrivate>
}

const fragments = {
  circle: {
    public: gql`
      fragment FollowingFeedRecommendCircleFooterPublic on Circle {
        id
        members(input: { first: 0 }) {
          totalCount
        }
        works(input: { first: 0 }) {
          totalCount
        }
        prices {
          amount
          currency
        }
      }
    `,
    private: gql`
      fragment FollowingFeedRecommendCircleFooterPrivate on Circle {
        id
        isMember
        invitedBy {
          id
          state
          freePeriod
        }
      }
    `,
  },
}

const Footer = ({ circle }: Props) => {
  const { members, works, prices } = circle

  const price = prices ? prices[0] : null

  return (
    <footer>
      <section className="footer">
        <TextIcon
          icon={<IconUser16 size="xs" />}
          color="grey"
          weight="md"
          size="sm"
          aira-label={`${members.totalCount} 個成員`}
        >
          {numAbbr(members.totalCount)}
        </TextIcon>

        <TextIcon
          icon={<IconArticle16 size="xs" />}
          color="grey"
          weight="md"
          size="sm"
          aira-label={`${works.totalCount} 篇作品`}
        >
          {numAbbr(works.totalCount)}
        </TextIcon>

        {price && (
          <TextIcon
            icon={<IconPrice12 size="xs" />}
            color="grey"
            weight="md"
            size="sm"
          >
            {price.amount} {price.currency} / <Translate id="month" />
          </TextIcon>
        )}
      </section>

      <style jsx>{styles}</style>
    </footer>
  )
}

Footer.fragments = fragments

export default Footer
