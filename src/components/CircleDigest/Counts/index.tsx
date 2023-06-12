import gql from 'graphql-tag'
import { useContext } from 'react'

import { numAbbr, translate } from '~/common/utils'
import {
  IconArticle16,
  IconUser16,
  LanguageContext,
  TextIcon,
} from '~/components'
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
        icon={<IconUser16 size="xs" />}
        color="grey"
        weight="md"
        size="sm"
        aria-label={translate({
          zh_hant: `${memberCount} 個成員`,
          zh_hans: `${memberCount} 个成员`,
          en: `${memberCount} members`,
          lang,
        })}
      >
        {numAbbr(memberCount)}
      </TextIcon>

      <TextIcon
        icon={<IconArticle16 size="xs" />}
        color="grey"
        weight="md"
        size="sm"
        aria-label={translate({
          zh_hant: `${articleCount} 篇作品`,
          zh_hans: `${articleCount} 篇作品`,
          en: `${articleCount} articles`,
          lang,
        })}
      >
        {numAbbr(articleCount)}
      </TextIcon>
    </section>
  )
}

Counts.fragments = fragments

export default Counts
