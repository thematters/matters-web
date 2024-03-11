import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  REFETCH_DONATORS,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import { DonationDialog, toast, Translate, ViewerContext } from '~/components'
import DonationButton from '~/components/Buttons/DonationButton'
import {
  ArticleDetailPublicQuery,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

interface SupportButtonProps {
  recipient: UserDonationRecipientFragment
  targetId: string
  article: NonNullable<ArticleDetailPublicQuery['article']>
  supported?: boolean
  toggleDonationDrawer: () => void
}

const SupportButton = ({
  recipient,
  targetId,
  article,
  supported = false,
  toggleDonationDrawer,
}: SupportButtonProps) => {
  const viewer = useContext(ViewerContext)

  const completeCallback = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_DONATORS, {}))
  }

  const forbid = (isAuthor?: boolean) => {
    toast.error({
      message: isAuthor ? (
        <Translate zh_hant="去支持其他用戶吧" zh_hans="去支持其他用户吧" />
      ) : (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  return (
    <DonationDialog
      completeCallback={completeCallback}
      recipient={recipient}
      targetId={targetId}
      article={article}
    >
      {({ openDialog }) => (
        <>
          <DonationButton
            supported={supported}
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'donate' })

              if (!viewer.isAuthed) {
                window.dispatchEvent(
                  new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                    detail: { trigger: UNIVERSAL_AUTH_TRIGGER.support },
                  })
                )
                return
              }

              if (viewer.isFrozen) {
                forbid()
                return
              }

              if (recipient.id === viewer.id) {
                forbid(true)
                return
              }

              // TODO: remove this after finished the new payment flow
              // openDialog()
              toggleDonationDrawer()
            }}
          />
        </>
      )}
    </DonationDialog>
  )
}

export default SupportButton
