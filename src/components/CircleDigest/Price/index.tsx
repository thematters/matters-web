import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_SUBSCRIBE_CIRCLE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, TextIcon, Translate, ViewerContext } from '~/components'
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
        if (!viewer.isAuthed) {
          window.dispatchEvent(
            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
              detail: { source: UNIVERSAL_AUTH_SOURCE.circle },
            })
          )

          return
        }

        openSubscribeCircleDialog()

        if (onClick) {
          onClick()
        }
      }}
    >
      <TextIcon weight="md" size="sm" color="white">
        {price.amount} {price.currency} /
        <FormattedMessage defaultMessage="month" />
      </TextIcon>
    </Button>
  )
}

Price.fragments = fragments

export default Price
