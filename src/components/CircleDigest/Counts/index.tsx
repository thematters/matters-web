import gql from 'graphql-tag'

import { IconArticle16, IconUser16, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { CountsCircle } from './__generated__/CountsCircle'

export type CountsProps = {
  circle: CountsCircle
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
  const memberCount = circle.members.totalCount
  const articleCount = circle.works.totalCount

  return (
    <section className="counts">
      <TextIcon
        icon={<IconUser16 size="xs" />}
        color="grey"
        weight="md"
        size="sm"
        aira-label={`${memberCount} 個成員`}
      >
        {memberCount > 0 ? numAbbr(memberCount) : undefined}
      </TextIcon>

      <TextIcon
        icon={<IconArticle16 size="xs" />}
        color="grey"
        weight="md"
        size="sm"
        aira-label={`${articleCount} 篇作品`}
      >
        {articleCount > 0 ? numAbbr(articleCount) : undefined}
      </TextIcon>

      <style jsx>{styles}</style>
    </section>
  )
}

Counts.fragments = fragments

export default Counts
