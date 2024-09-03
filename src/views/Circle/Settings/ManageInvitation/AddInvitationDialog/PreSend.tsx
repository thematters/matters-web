import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { REFETCH_CIRCLE_PENDING_INVITES } from '~/common/enums'
import {
  Card,
  Dialog,
  List,
  QueryError,
  SpinnerBlock,
  Throw404,
  useMutation,
  UserDigest,
  useRoute,
} from '~/components'
import INVITE_CIRCLE from '~/components/GQL/mutations/invite'
import { StagingNode } from '~/components/SearchSelect/StagingArea'
import { InvitationsCircleQuery, InviteCircleMutation } from '~/gql/graphql'

import { INVITATIONS_CIRCLE } from './gql'
import SelectPeriod from './SelectPeriod'

interface Props {
  closeDialog: () => void
  confirm: () => void
  invitees: StagingNode[]
}

/**
 * This component is displaying selected invitees and free period.
 *
 * Usage:
 *
 * ```tsx
 *   <InviteePreSend />
 * ```
 */
const InviteePreSend = ({ closeDialog, confirm, invitees }: Props) => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const [period, setPeriod] = useState<number>(30)
  const [invite, { loading: inviteLoading }] =
    useMutation<InviteCircleMutation>(INVITE_CIRCLE)

  /**
   * Data Fetching
   */
  const { data, loading, error } = useQuery<InvitationsCircleQuery>(
    INVITATIONS_CIRCLE,
    {
      variables: { name },
    }
  )

  /**
   * Rendering
   */
  const circle = data?.circle

  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!circle) {
    return <Throw404 />
  }

  const send = async () => {
    const nodes = invitees.map(({ node }) => {
      if (node.__typename === 'User') {
        return {
          id: node.id || null,
          email: node.id ? null : node.displayName,
        }
      }
    })

    const result = await invite({
      variables: {
        circleId: circle.id,
        freePeriod: period,
        invitees: nodes,
      },
    })

    if (!result) {
      return
    }

    window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_PENDING_INVITES))
    confirm()
  }

  const SubmitButton = (
    <Dialog.TextButton
      text={<FormattedMessage defaultMessage="Confirm and Send" id="rXnmeE" />}
      onClick={send}
      loading={inviteLoading}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Send"
            id="tzq2+W"
            description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/PreSend.tsx"
          />
        }
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="Friends will receive free trial invitations to Circle. Set up your invitations now!"
              id="O0QB1v"
              description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/PreSend.tsx"
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Content>
        <List hasBorder={false}>
          {invitees.map(
            ({ node }, i) =>
              node.__typename === 'User' && (
                <List.Item key={i}>
                  <Card spacing={[8, 16]}>
                    <UserDigest.Mini
                      user={node}
                      direction="column"
                      hasAvatar
                      hasDisplayName
                      hasUserName
                      disabled
                    />
                  </Card>
                </List.Item>
              )
          )}
        </List>
      </Dialog.Content>

      <SelectPeriod period={period} onChange={setPeriod} />

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default InviteePreSend
