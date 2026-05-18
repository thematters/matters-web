import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
import {
  ToggleCommunityWatchMutation,
  UserFeatureFlagType,
} from '~/gql/graphql'

const TOGGLE_COMMUNITY_WATCH = gql`
  mutation ToggleCommunityWatch($id: ID!, $flags: [UserFeatureFlagType!]!) {
    putUserFeatureFlags(input: { ids: [$id], flags: $flags }) {
      id
      oss {
        featureFlags {
          type
        }
      }
      info {
        badges {
          type
        }
      }
    }
  }
`

export type OpenToggleCommunityWatchDialogWithProps = {
  enabled: boolean
  flags: UserFeatureFlagType[]
}

export interface ToggleCommunityWatchDialogProps {
  id: string
  userName: string
  children: ({
    openDialog,
  }: {
    openDialog: (props: OpenToggleCommunityWatchDialogWithProps) => void
  }) => React.ReactNode
}

const ToggleCommunityWatchDialog = ({
  id,
  userName,
  children,
}: ToggleCommunityWatchDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)
  const [enabled, setEnabled] = useState(false)
  const [flags, setFlags] = useState<UserFeatureFlagType[]>([])
  const [toggleCommunityWatch, { loading }] =
    useMutation<ToggleCommunityWatchMutation>(TOGGLE_COMMUNITY_WATCH)

  const openDialogWithProps = ({
    enabled,
    flags,
  }: OpenToggleCommunityWatchDialogWithProps) => {
    setEnabled(enabled)
    setFlags(flags)
    openDialog()
  }

  const onToggle = async () => {
    const nextFlags = enabled
      ? flags.filter((flag) => flag !== UserFeatureFlagType.CommunityWatch)
      : Array.from(new Set([...flags, UserFeatureFlagType.CommunityWatch]))

    await toggleCommunityWatch({
      variables: {
        id,
        flags: nextFlags,
      },
    })
    toast.info({ message: '設置成功' })
    closeDialog()
  }

  return (
    <>
      {children({ openDialog: openDialogWithProps })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<span>{enabled ? '取消守望相助隊' : '指定為守望相助隊'}</span>}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p
              dangerouslySetInnerHTML={{
                __html: enabled
                  ? `確認要取消「<span class="u-highlight">${userName}</span>」的守望相助隊權限嗎？`
                  : `確認要指定「<span class="u-highlight">${userName}</span>」為守望相助隊員嗎？`,
              }}
            />
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              color={enabled ? 'red' : 'green'}
              onClick={onToggle}
              loading={loading}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              color={enabled ? 'red' : 'green'}
              onClick={onToggle}
              loading={loading}
            />
          }
        />
      </Dialog>
    </>
  )
}

export default ToggleCommunityWatchDialog
