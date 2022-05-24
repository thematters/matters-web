import gql from 'graphql-tag'

import { CircleDigest } from '~/components/CircleDigest'

import styles from './styles.css'

import { NoticeCircleCard as NoticeCircleCardType } from './__generated__/NoticeCircleCard'

const NoticeCircleCard = ({
  circle,
}: {
  circle: NoticeCircleCardType | null
}) => {
  if (!circle) {
    return null
  }

  return (
    <section className="sub-content">
      <CircleDigest.Rich
        bgColor="grey-lighter"
        borderRadius="xtight"
        circle={circle}
        hasFooter
        hasOwner
        hasPrice
      />
      <style jsx>{styles}</style>
    </section>
  )
}

NoticeCircleCard.fragments = {
  circle: gql`
    fragment NoticeCircleCard on Circle {
      id
      ...DigestRichCirclePublic
    }
    ${CircleDigest.Rich.fragments.circle.public}
  `,
}

export default NoticeCircleCard
