import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { Button, TextIcon, useMutation } from '~/components'
import INVITE_CIRCLE from '~/components/GQL/mutations/invite'
import { InviteCircleInvitee, InviteCircleMutation } from '~/gql/graphql'

interface CircleInvitationResendProps {
  circleId: string
  freePeriod: number
  invitees: InviteCircleInvitee[]
}

/**
 * This a button component for re-invite an existed invitee.
 *
 * Usage:
 *
 * ```tsx
 *   <CircleInvitationResendButton
 *     circleId={''}
 *     freePeriod={1}
 *     invitees={[{ id: '' , email: null }]}
 *   />
 * ```
 */
const CircleInvitationResendButton = ({
  circleId,
  freePeriod,
  invitees,
}: CircleInvitationResendProps) => {
  const [disabled, setDisabled] = useState<boolean>(false)
  const [invite] = useMutation<InviteCircleMutation>(INVITE_CIRCLE)
  const resend = async () => {
    setDisabled(true)

    try {
      await invite({
        variables: {
          circleId,
          freePeriod,
          invitees,
        },
      })

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <FormattedMessage defaultMessage="Invitation sent" description="src/components/CircleInvitation/Resend.tsx" />
            ),
          },
        })
      )
    } catch (e) {
      console.error(e)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <Button
      spacing={[0, 'base']}
      size={[null, '2rem']}
      bgColor="grey-lighter"
      onClick={() => resend()}
      disabled={disabled}
    >
      <TextIcon size="sm-s" color="black" weight="md">
        <FormattedMessage defaultMessage="Resend" description="Resend button" />
      </TextIcon>
    </Button>
  )
}

export default CircleInvitationResendButton
