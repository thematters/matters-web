import { useContext } from 'react'

import {
  ADD_TOAST,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  REFETCH_DONATORS,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import { DonationDialog, Translate, ViewerContext } from '~/components'
import DonationButton from '~/components/Buttons/DonationButton'
import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'

interface SupportButtonProps {
  recipient: UserDonationRecipient
  targetId: string
  article: ArticleDetailPublic_article
  supported?: boolean
}

const SupportButton = ({
  recipient,
  targetId,
  article,
  supported = false,
}: SupportButtonProps) => {
  const viewer = useContext(ViewerContext)

  const completeCallback = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_DONATORS, {}))
  }

  const forbid = (isAuthor?: boolean) => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: isAuthor ? (
            <Translate zh_hant="去支持其他用戶吧" zh_hans="去支持其他用户吧" />
          ) : (
            <Translate id="FORBIDDEN_BY_STATE" />
          ),
        },
      })
    )
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
                    detail: { source: UNIVERSAL_AUTH_SOURCE.support },
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

              openDialog()
            }}
          />
        </>
      )}
    </DonationDialog>
  )
}

export default SupportButton
