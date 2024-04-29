import gql from 'graphql-tag'
import { useContext } from 'react'

import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
import { ReactComponent as IconUser } from '@/public/static/icons/24px/user.svg'
import { TEST_ID } from '~/common/enums'
import { numAbbr, translate } from '~/common/utils'
import { Icon, LanguageContext, TextIcon } from '~/components'
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
  const { lang } = useContext(LanguageContext)

  const memberCount = circle.members.totalCount
  const articleCount = circle.works.totalCount

  return (
    <section className={styles.counts}>
      <TextIcon
        icon={<Icon icon={IconUser} size="xs" />}
        color="grey"
        weight="md"
        size="sm"
        aria-label={translate({
          zh_hant: `${memberCount} 個成員`,
          zh_hans: `${memberCount} 个成员`,
          en: `${memberCount} members`,
          lang,
        })}
        data-test-id={TEST_ID.DIGEST_CIRCLE_MEMBER_COUNT}
      >
        {numAbbr(memberCount)}
      </TextIcon>

      <TextIcon
        icon={<Icon icon={IconDraft} size="xs" />}
        color="grey"
        weight="md"
        size="sm"
        aria-label={translate({
          zh_hant: `${articleCount} 篇作品`,
          zh_hans: `${articleCount} 篇作品`,
          en: `${articleCount} articles`,
          lang,
        })}
        data-test-id={TEST_ID.DIGEST_CIRCLE_ARTICLE_COUNT}
      >
        {numAbbr(articleCount)}
      </TextIcon>
    </section>
  )
}

Counts.fragments = fragments

export default Counts
