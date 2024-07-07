// import gql from 'graphql-tag'
// import // ApplyCampaignMutation,
// '~/gql/graphql'

import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  useDialogSwitch,
  // useMutation,
} from '~/components'
import { MOCK_CAMPAIGN } from '~/stories/mocks'

// const APPLY_CAMPAIGN = gql`
//   mutation ApplyCampaign($id: ID!) {
//     applyCampaign(input: { id: $id }) {
//       id
//       applicationState
//     }
//   }
// `

export interface ApplyCampaignDialogProps {
  campaign: typeof MOCK_CAMPAIGN
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const ApplyCampaignDialog = ({
  campaign,
  children,
}: ApplyCampaignDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const now = new Date()
  const isInApplicationPeriod =
    !campaign.applicationPeriod.end ||
    now < new Date(campaign.applicationPeriod.end)

  const applyCampaign = () => {}
  // const [applyCampaign] = useMutation<ApplyCampaignMutation>(APPLY_CAMPAIGN, {
  //   variables: { id: user.id },
  //   optimisticResponse: {
  //     applyCampaign: {
  //       id: user.id,
  //       applicationState: 'pending',
  //       __typename: 'Campaign',
  //     },
  //   },
  // })

  // auto apply
  useEffect(() => {
    if (!isInApplicationPeriod) return

    applyCampaign()
  }, [isInApplicationPeriod])

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={isInApplicationPeriod ? '報名申請已遞交 🎉' : '陪跑參與活動'}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              {isInApplicationPeriod
                ? '我們將盡快審核你的申請，敬請期待活動開跑！'
                : '錯過了正式報名期，仍然可以在報名成功後投稿作品，但無法獲得大滿貫徽章。下次記得早點報名，就有機會獲得徽章了！'}
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          btns={
            <>
              {!isInApplicationPeriod && (
                <Dialog.RoundedButton
                  text="確認參加"
                  // loading={loading}
                  onClick={applyCampaign}
                />
              )}
              <Dialog.RoundedButton
                text={
                  <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
                }
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
          smUpBtns={
            <>
              {isInApplicationPeriod && (
                <Dialog.TextButton
                  text={
                    <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
                  }
                  color="greyDarker"
                  onClick={closeDialog}
                />
              )}
              {!isInApplicationPeriod && (
                <Dialog.TextButton
                  text={
                    <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                  }
                  color="greyDarker"
                  onClick={closeDialog}
                />
              )}
              {!isInApplicationPeriod && (
                <Dialog.TextButton
                  text="確認參加"
                  // loading={loading}
                  color="green"
                  onClick={applyCampaign}
                />
              )}
            </>
          }
        />
      </Dialog>
    </>
  )
}

const LazyApplyCampaignDialog = (props: ApplyCampaignDialogProps) => (
  <Dialog.Lazy mounted={<ApplyCampaignDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyApplyCampaignDialog
