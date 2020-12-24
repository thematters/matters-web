import {
  Button,
  IconArticle16,
  IconUser16,
  TextIcon,
  Translate,
} from '~/components'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

export type FooterControls = {
  hasPrice?: boolean
}

export type FooterProps = {
  // circle: FooterCircle
  circle: any
} & FooterControls

const Footer: React.FC<FooterProps> = ({ circle, hasPrice }) => {
  const memberCount = circle.members.totalCount
  const articleCount = circle.works.totalCount
  const price = circle.prices && circle.prices[0]
  const isMonthly = price.billingCycle === 'monthly'

  return (
    <footer>
      <section className="left">
        <TextIcon
          icon={<IconUser16 size="xs" />}
          color="grey"
          weight="md"
          size="sm"
        >
          {memberCount > 0 ? numAbbr(memberCount) : undefined}
        </TextIcon>

        <TextIcon
          icon={<IconArticle16 size="xs" />}
          color="grey"
          weight="md"
          size="sm"
        >
          {articleCount > 0 ? numAbbr(articleCount) : undefined}
        </TextIcon>
      </section>

      {hasPrice && price && (
        <Button size={[null, '2rem']} spacing={[0, 'base']} bgColor="gold">
          <TextIcon weight="md" size="sm" color="white">
            {price.amount} {price.currency} /{' '}
            <Translate id={isMonthly ? 'month' : 'year'} />
          </TextIcon>
        </Button>
      )}

      <style jsx>{styles}</style>
    </footer>
  )
}

export default Footer
