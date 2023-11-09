import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_SUBSCRIBE_CIRCLE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEST_ID,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, TextIcon, ViewerContext } from '~/components'
import {
  PriceCirclePrivateFragment,
  PriceCirclePublicFragment,
} from '~/gql/graphql'

type PriceProps = {
  circle: PriceCirclePublicFragment & Partial<PriceCirclePrivateFragment>

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
        invitedBy {
          id
          state
          freePeriod
        }
      }
    `,
  },
}

const Price = ({ circle, onClick }: PriceProps) => {
  const viewer = useContext(ViewerContext)
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
          <FormattedMessage
            defaultMessage="Enter"
            id="ydQPbv"
            description="src/components/CircleDigest/Price/index.tsx"
          />
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
        if (!viewer.isAuthed) {
          window.dispatchEvent(
            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
              detail: { trigger: UNIVERSAL_AUTH_TRIGGER.circlePrice },
            })
          )
          return
        }

        openSubscribeCircleDialog()

        if (onClick) {
          onClick()
        }
      }}
      testId={TEST_ID.DIGEST_CIRCLE_PRICE}
    >
      <TextIcon weight="md" size="sm" color="white">
        {price.amount} {price.currency} /
        <FormattedMessage defaultMessage="month" id="Cu3Cty" />
      </TextIcon>
    </Button>
  )
}

Price.fragments = fragments

export default Price
