import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import Tasks from '../Tasks'

interface OnboardingTasksProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseOnboardingTasksDialog: React.FC<OnboardingTasksProps> = ({
  children,
}) => {
  const [showDialog, setShowDialog] = useState(true)

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

        <Tasks />
      </Dialog>
    </>
  )
}

export default (props: OnboardingTasksProps) => (
  <Dialog.Lazy mounted={<BaseOnboardingTasksDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
