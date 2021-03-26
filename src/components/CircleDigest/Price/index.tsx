import gql from 'graphql-tag'

import { Button, TextIcon, Translate } from '~/components'

import { OPEN_SUBSCRIBE_CIRCLE_DIALOG } from '~/common/enums'
import { toPath } from '~/common/utils'

import { PriceCirclePrivate } from './__generated__/PriceCirclePrivate'
import { PriceCirclePublic } from './__generated__/PriceCirclePublic'

type PriceProps = {
  circle: PriceCirclePublic & Partial<PriceCirclePrivate>

  onClick?: () => void
}

const fragments = {
  circle: {
    public: gql`
      fragment PriceCirclePublic on Circle {
        id
        name
        prices {
          amount
          currency
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

const Price = ({ circle, onClick }: PriceProps) => {
  const price = circle.prices && circle.prices[0]

  if (!price) {
    return null
  }

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

  const openSubscribeCircleDialog = () =>
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))

  return (
    <Button
      size={[null, '2rem']}
      spacing={[0, 'base']}
      bgColor="gold"
      onClick={() => {
        openSubscribeCircleDialog()

        if (onClick) {
          onClick()
        }
      }}
    >
      <TextIcon weight="md" size="sm" color="white">
        {price.amount} {price.currency} / <Translate id="month" />
      </TextIcon>
    </Button>
  )
}

Price.fragments = fragments

export default Price
