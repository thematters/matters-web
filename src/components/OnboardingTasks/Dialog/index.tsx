import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import Tasks from '../Tasks'
import styles from './styles.css'

interface OnboardingTasksDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseOnboardingTasksDialog: React.FC<OnboardingTasksDialogProps> = ({
  children,
}) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            <Translate
              zh_hant="歡迎遨遊 Matters 星際網絡"
              zh_hans="欢迎遨游 Matters 星际网络"
            />
          }
          close={close}
          closeTextId="close"
        />
        <Dialog.Content hasGrow spacing={[0, 0]}>
          <p>
            <Translate
              zh_hant="導航帶你發現更多寶藏作者與優質作品，"
              zh_hans="导航带你发现更多宝藏作者与优质作品，"
            />
            <br />
            <Translate
              zh_hant="更有首發限定好禮，留下創作足跡，"
              zh_hans="更有首发限定好礼，留下创作足迹，"
            />
            <br />
            <Translate
              zh_hant="即拿 LikeCoin 獎賞！🎉"
              zh_hans="即拿 LikeCoin 奖赏！🎉"
            />
          </p>

          <Tasks />
        </Dialog.Content>
      </Dialog>

      <style jsx>{styles}</style>
    </>
  )
}

const OnboardingTasksDialog = (props: OnboardingTasksDialogProps) => (
  <Dialog.Lazy mounted={<BaseOnboardingTasksDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default OnboardingTasksDialog
