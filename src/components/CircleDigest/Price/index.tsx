import gql from 'graphql-tag'
import { toPath } from 'lodash'

import { Button, TextIcon, Translate } from '~/components'

import { PriceCirclePrivate } from './__generated__/PriceCirclePrivate'
import { PriceCirclePublic } from './__generated__/PriceCirclePublic'

type PriceProps = {
  circle: PriceCirclePublic & Partial<PriceCirclePrivate>
}

const fragments = {
  circle: {
    public: gql`
      fragment PriceCirclePublic on Circle {
        id
        prices {
          amount
          currency
          billingCycle
        }
      }
    `,
    private: gql`
      fragment PriceCirclePrivate on Circle {
        id
        isMember
      }
    `,
  },
}

const Price = ({ circle }: PriceProps) => {
  const price = circle.prices && circle.prices[0]

  if (!price) {
    return null
  }

  const isMonthly = price.billingCycle === 'month'
  const isMember = circle.isMember
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  if (isMember) {
    return (
      <Button
        size={[null, '2rem']}
        spacing={[0, 'base']}
        bgColor="green"
        {...path}
      >
        <TextIcon weight="md" size="sm" color="white">
          <Translate zh_hant="進入圍爐" zh_hans="进入围炉" />
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button size={[null, '2rem']} spacing={[0, 'base']} bgColor="gold">
      <TextIcon weight="md" size="sm" color="white">
        {price.amount} {price.currency} /{' '}
        <Translate id={isMonthly ? 'month' : 'year'} />
      </TextIcon>
    </Button>
  )
}

Price.fragments = fragments

export default Price
