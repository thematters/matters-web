import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button, TextIcon, toast, useMutation } from '~/components'
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

      toast.info({
        message: (
          <FormattedMessage defaultMessage="Invitation sent" id="sjdyQ0" />
        ),
      })
    } catch (e) {
      console.error(e)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <Button
      spacing={[0, 16]}
      size={[null, '2rem']}
      bgColor="greyLighter"
      onClick={() => resend()}
      disabled={disabled}
    >
      <TextIcon size={13} color="black" weight="medium">
        <FormattedMessage defaultMessage="Resend" id="IXycMo" />
      </TextIcon>
    </Button>
  )
}

export default CircleInvitationResendButton
