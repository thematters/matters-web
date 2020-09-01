import { useContext } from 'react'

import {
  Button,
  DonationDialog,
  IconHeart,
  LoginButton,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, REFETCH_DONATORS } from '~/common/enums'
import { analytics } from '~/common/utils'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

interface DonationButtonProps {
  recipient: UserDonationRecipient
  targetId: string
}

const DonationButton = ({ recipient, targetId }: DonationButtonProps) => {
  const viewer = useContext(ViewerContext)

  const completeCallback = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_DONATORS, {}))
  }

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
  }

  const showLoginToast = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="請登入／註冊支持作者"
              zh_hans="请登入／注册支持作者"
            />
          ),
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <section className="container">
      <DonationDialog
        completeCallback={completeCallback}
        recipient={recipient}
        targetId={targetId}
      >
        {({ open }) => (
          <Button
            size={['10.5rem', '2.5rem']}
            bgColor="red"
            disabled={recipient.id === viewer.id}
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'donate' })
              if (!viewer.isAuthed) {
                showLoginToast()
                return
              }
              if (viewer.isFrozen) {
                forbid()
                return
              }
              open()
            }}
          >
            <TextIcon icon={<IconHeart size="sm" />} weight="md" color="white">
              <Translate id="donation" />
            </TextIcon>
          </Button>
        )}
      </DonationDialog>

      <style jsx>{styles}</style>
    </section>
  )
}

export default DonationButton
