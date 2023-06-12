import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { REFETCH_CIRCLE_PENDING_INVITES } from '~/common/enums'
import {
  Card,
  Dialog,
  List,
  QueryError,
  Spinner,
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
 *   <BaseInviteePreSend />
 * ```
 */
const BaseInviteePreSend = ({ closeDialog, confirm, invitees }: Props) => {
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
    return <Spinner />
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

  return (
    <>
      <Dialog.Message align="left">
        <p>
          <FormattedMessage
            defaultMessage="Friends will receive free trial invitations to Circle. Set up your invitations now!"
            description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/PreSend.tsx"
          />
        </p>
      </Dialog.Message>

      <Dialog.Content hasGrow>
        <List hasBorder={false}>
          {invitees.map(
            ({ node }, i) =>
              node.__typename === 'User' && (
                <List.Item key={i}>
                  <Card spacing={['xtight', 'base']}>
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

      <Dialog.Footer>
        <Dialog.Footer.Button onClick={() => send()} loading={inviteLoading}>
          <FormattedMessage defaultMessage="Confirm and Send" description="" />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          bgColor="greyLighter"
          textColor="black"
          onClick={closeDialog}
        >
          <FormattedMessage
            defaultMessage="Not Now"
            description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/PreSend.tsx"
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

/**
 * This is a wrapper component of invitaiton pre-send list.
 *
 * Usage:
 *
 * ```tsx
 *   <InviteePreSend closeDialog={closeDialog} confirm={confirm} invitees={[]} />
 * ```
 */
const InviteePreSend = (props: Props) => (
  <>
    <Dialog.Header
      title={
        <FormattedMessage
          defaultMessage="Send"
          description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/PreSend.tsx"
        />
      }
      closeDialog={props.closeDialog}
      closeTextId="cancel"
    />
    <BaseInviteePreSend {...props} />
  </>
)

export default InviteePreSend
