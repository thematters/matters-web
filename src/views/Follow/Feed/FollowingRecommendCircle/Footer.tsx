import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'

import IconDraft from '@/public/static/icons/24px/draft.svg'
import IconUser from '@/public/static/icons/24px/user.svg'
import IconPrice from '@/public/static/icons/price.svg'
import { numAbbr } from '~/common/utils'
import { Icon, TextIcon } from '~/components'
import {
  FollowingFeedRecommendCircleFooterPrivateFragment,
  FollowingFeedRecommendCircleFooterPublicFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

type Props = {
  circle: FollowingFeedRecommendCircleFooterPublicFragment &
    Partial<FollowingFeedRecommendCircleFooterPrivateFragment>
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
  const intl = useIntl()
  const { members, works, prices } = circle

  const price = prices ? prices[0] : null

  return (
    <footer>
      <section className={styles.footer}>
        <TextIcon
          icon={<Icon icon={IconUser} size={12} />}
          color="grey"
          weight="medium"
          size={14}
          aira-label={intl.formatMessage(
            {
              defaultMessage: `{total} members`,
              id: 'VmYzLr',
            },
            { total: members.totalCount }
          )}
        >
          {numAbbr(members.totalCount)}
        </TextIcon>

        <TextIcon
          icon={<Icon icon={IconDraft} size={12} />}
          color="grey"
          weight="medium"
          size={14}
          aira-label={intl.formatMessage(
            {
              defaultMessage: `{total} articles`,
              id: 'XOEFDf',
            },
            { total: works.totalCount }
          )}
        >
          {numAbbr(works.totalCount)}
        </TextIcon>

        {price && (
          <TextIcon
            icon={<Icon icon={IconPrice} size={12} />}
            color="grey"
            weight="medium"
            size={14}
          >
            {price.amount} {price.currency} /{' '}
            <FormattedMessage defaultMessage="month" id="Cu3Cty" />
          </TextIcon>
        )}
      </section>
    </footer>
  )
}

Footer.fragments = fragments

export default Footer
