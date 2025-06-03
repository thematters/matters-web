import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import IconDraft from '@/public/static/icons/24px/draft.svg'
import IconUser from '@/public/static/icons/24px/user.svg'
import { TEST_ID } from '~/common/enums'
import { numAbbr } from '~/common/utils'
import { Icon, TextIcon } from '~/components'
import { CountsCircleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type CountsProps = {
  circle: CountsCircleFragment
}

const fragments = {
  circle: gql`
    fragment CountsCircle on Circle {
      id
      members(input: { first: 0 }) {
        totalCount
      }
      works(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

const Counts = ({ circle }: CountsProps) => {
  const intl = useIntl()

  const memberCount = circle.members.totalCount
  const articleCount = circle.works.totalCount

  return (
    <section className={styles.counts}>
      <TextIcon
        icon={<Icon icon={IconUser} size={12} />}
        color="grey"
        weight="medium"
        size={14}
        aria-label={intl.formatMessage(
          {
            defaultMessage: `{total} members`,
            id: 'VmYzLr',
          },
          { total: memberCount }
        )}
        data-test-id={TEST_ID.DIGEST_CIRCLE_MEMBER_COUNT}
      >
        {numAbbr(memberCount)}
      </TextIcon>

      <TextIcon
        icon={<Icon icon={IconDraft} size={12} />}
        color="grey"
        weight="medium"
        size={14}
        aria-label={intl.formatMessage(
          {
            defaultMessage: `{articleCount} articles`,
            id: 'RnKPVm',
          },
          { articleCount }
        )}
        data-test-id={TEST_ID.DIGEST_CIRCLE_ARTICLE_COUNT}
      >
        {numAbbr(articleCount)}
      </TextIcon>
    </section>
  )
}

Counts.fragments = fragments

export default Counts
