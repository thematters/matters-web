import { useState } from 'react'

import { CLOSE_ONBOARDING_TASKS_DIALOG } from '~/common/enums'
import { Dialog, Translate, useDialogSwitch } from '~/components'
import { useEventListener } from '~/components/Hook'

import Galaxy from '../Galaxy'
import Tasks from '../Tasks'
import styles from './styles.module.css'

interface OnboardingTasksDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseOnboardingTasksDialog: React.FC<OnboardingTasksDialogProps> = ({
  children,
}) => {
  const [task, setTask] = useState(1)
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  useEventListener(CLOSE_ONBOARDING_TASKS_DIALOG, closeDialog)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate
              zh_hant="歡迎遨遊 Matters 星際網絡"
              zh_hans="欢迎遨游 Matters 星际网络"
              en="Welcome to the Matters galaxy"
            />
          }
        />

        <Dialog.Content noSpacing>
          <section className={styles.description}>
            <span>
              <Translate
                zh_hant="導航帶你發現更多寶藏作者和優質作品。"
                zh_hans="导航带你发现更多宝藏作者和优质作品。"
                en="The guide will help you explore more amazing creators and articles."
              />
            </span>
            <br />
            <span className={styles.bold}>
              <Translate
                zh_hant="點擊下面 5 顆星球查看任務提示！"
                zh_hans="点击下面 5 颗星球查看任务提示！"
                en="Click planets to see instructions."
              />
            </span>
          </section>

          <Galaxy task={task} onClick={setTask} />

          <Tasks task={task} />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

const OnboardingTasksDialog = (props: OnboardingTasksDialogProps) => (
  <Dialog.Lazy mounted={<BaseOnboardingTasksDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default OnboardingTasksDialog
