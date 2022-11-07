import { useContext } from 'react'

import {
  Button,
  DonationDialog,
  IconDonate24,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import {
  ADD_TOAST,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  REFETCH_DONATORS,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { analytics } from '~/common/utils'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'

interface DonationButtonProps {
  recipient: UserDonationRecipient
  targetId: string
  article: ArticleDetailPublic_article
}

const DonationButton = ({
  recipient,
  targetId,
  article,
}: DonationButtonProps) => {
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
        <Button
          size={['10.5rem', '2.5rem']}
          bgColor="gold"
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
        >
          <TextIcon icon={<IconDonate24 />} weight="md" color="white">
            <Translate id="donation" />
          </TextIcon>
        </Button>
      )}
    </DonationDialog>
  )
}

export default DonationButton
