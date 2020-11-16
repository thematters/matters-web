import { useApolloClient } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  Dialog,
  EmbedShare,
  LikeCoinDialog,
  Translate,
  ViewerContext,
} from '~/components'

import { STORAGE_KEY_ONBOARDING_TASKS } from '~/common/enums'
import { storage } from '~/common/utils'

import styles from './styles.css'
import TaskItem from './TaskItem'

const Tasks = () => {
  const viewer = useContext(ViewerContext)
  const client = useApolloClient()

  const hideTasks = () => {
    client.writeData({
      id: 'ClientPreference:local',
      data: { onboardingTasks: false },
    })

    storage.set(STORAGE_KEY_ONBOARDING_TASKS, false)
  }

  return (
    <>
      <ul>
        <LikeCoinDialog>
          {({ open }) => (
            <TaskItem
              title={
                <Translate
                  zh_hant="設置 Liker ID 化讚為賞"
                  zh_hans="设置 Liker ID 化赞为赏"
                />
              }
              done={viewer.onboardingTasks.hasLikerId}
              onClick={viewer.onboardingTasks.hasLikerId ? undefined : open}
            />
          )}
        </LikeCoinDialog>

        <TaskItem
          title={
            <Translate
              zh_hant="追蹤 5 位喜歡的創作者"
              zh_hans="追踪 5 位喜欢的创作者"
            />
          }
          done={viewer.onboardingTasks.hasFollowee}
        />
        <TaskItem
          title={
            <Translate
              zh_hant="追蹤 5 個感興趣的標籤"
              zh_hans="追踪 5 个感兴趣的标签"
            />
          }
          done={viewer.onboardingTasks.hasFollowingTag}
        />
        <TaskItem
          title={
            <Translate
              zh_hant="用第一篇創作同社區問好"
              zh_hans="用第一篇创作同社区问好"
            />
          }
          subtitle={
            <Translate
              zh_hant="參與 #新人打卡 關注"
              zh_hans="参与 #新人打卡 关注"
            />
          }
          done={viewer.onboardingTasks.hasArticle}
        />
        <TaskItem
          title={
            <Translate
              zh_hant="解鎖評論權限參與更多互動"
              zh_hans="解锁评论权限参与更多互动"
            />
          }
          subtitle={
            <Translate
              zh_hant="獲得拍手數 × 2 + 閱讀篇數 ≥ 10"
              zh_hans="获得拍手数 × 2 + 阅读篇数 ≥ 10"
            />
          }
          done={viewer.onboardingTasks.hasCommentPremission}
        />
      </ul>

      <section className={viewer.onboardingTasks.finished ? 'allDone' : ''}>
        <Dialog.Footer>
          {viewer.onboardingTasks.finished ? (
            <Dialog.Footer.Button
              type="button"
              bgColor="gold"
              textColor="white"
              textSize="sm"
              height="2rem"
            >
              <Translate zh_hant="繼續閱讀航程" zh_hans="继续阅读航程" />
            </Dialog.Footer.Button>
          ) : (
            <Dialog.Footer.Button type="button" onClick={hideTasks} implicit>
              <Translate
                zh_hant="不跟導航自己逛逛 😌"
                zh_hans="不跟导航自己逛逛 😌"
              />
            </Dialog.Footer.Button>
          )}
        </Dialog.Footer>

        {viewer.onboardingTasks.finished && (
          <>
            <hr />
            <EmbedShare
              headerTitle={
                <Translate
                  zh_hant="邀請更多好友加入星際旅行"
                  zh_hans="邀请更多好友加入星际旅行"
                />
              }
              wrap
            />
          </>
        )}
      </section>

      <style jsx>{styles}</style>
    </>
  )
}

export default Tasks
