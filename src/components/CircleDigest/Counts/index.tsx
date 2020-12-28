import { IconArticle16, IconUser16, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

export type CountsProps = {
  // circle: CountsCircle
  circle: any
}

const Counts: React.FC<CountsProps> = ({ circle }) => {
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

export default Counts
