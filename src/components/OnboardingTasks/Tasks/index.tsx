import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Dialog,
  EmbedShare,
  LanguageContext,
  Translate,
  useMutation,
  useResponsive,
  ViewerContext,
} from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'

import {
  CLOSE_ONBOARDING_TASKS_DIALOG,
  ONBOARDING_TASKS_HIDE,
  OPEN_LIKE_COIN_DIALOG,
  OPEN_RECOMMEND_AUTHOR_DIALOG,
  OPEN_RECOMMEND_TAG_DIALOG,
  URL_QS,
} from '~/common/enums'
import { analytics, toPath, translate } from '~/common/utils'

import styles from './styles.css'
import TaskItem from './TaskItem'

import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'

interface Props {
  task: number
}

const Tasks = ({ task }: Props) => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const isLargeUp = useResponsive('lg-up')

  const [putDraft] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang }),
      tags: ['新人打卡'],
    },
  })
  const createDraft = async () => {
    analytics.trackEvent('click_button', {
      type: 'write',
    })
    const result = await putDraft()
    const { slug, id } = result?.data?.putDraft || {}

    if (slug && id) {
      const path = toPath({ page: 'draftDetail', slug, id })
      router.push(path.href)
    }
  }

  const openRecommendAuthorDialog = () => {
    window.dispatchEvent(new CustomEvent(CLOSE_ONBOARDING_TASKS_DIALOG, {}))
    window.dispatchEvent(new CustomEvent(OPEN_RECOMMEND_AUTHOR_DIALOG, {}))
  }

  const openRecommendTagDialog = () => {
    window.dispatchEvent(new CustomEvent(CLOSE_ONBOARDING_TASKS_DIALOG, {}))
    window.dispatchEvent(new CustomEvent(OPEN_RECOMMEND_TAG_DIALOG, {}))
  }

  const hideTasks = () => {
    window.dispatchEvent(new CustomEvent(ONBOARDING_TASKS_HIDE, {}))
  }

  const sharePath = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  }).href

  return (
    <>
      <section className="task">
        {task === 1 && (
          <TaskItem
            order={
              <Translate zh_hant="任務一" zh_hans="任务一" en="First task" />
            }
            title={
              <Translate
                zh_hant="設置 Liker ID 化讚為賞"
                zh_hans="设置 Liker ID 化赞为赏"
                en="Setup Liker ID and turn likes into income"
              />
            }
            done={viewer.onboardingTasks.tasks.likerId}
            onClick={
              viewer.onboardingTasks.tasks.likerId
                ? undefined
                : () =>
                    window.dispatchEvent(
                      new CustomEvent(OPEN_LIKE_COIN_DIALOG, {})
                    )
            }
          />
        )}

        {task === 2 && (
          <TaskItem
            order={
              <Translate zh_hant="任務二" zh_hans="任务二" en="Second task" />
            }
            title={
              <Translate
                zh_hant="追蹤 5 位喜歡的創作者"
                zh_hans="追踪 5 位喜欢的创作者"
                en="Follow at least 5 creators"
              />
            }
            done={viewer.onboardingTasks.tasks.followee}
            onClick={
              viewer.onboardingTasks.tasks.followee
                ? undefined
                : openRecommendAuthorDialog
            }
          />
        )}

        {task === 3 && (
          <TaskItem
            order={
              <Translate zh_hant="任務三" zh_hans="任务三" en="Third task" />
            }
            title={
              <Translate
                zh_hant="追蹤 5 個感興趣的標籤"
                zh_hans="追踪 5 个感兴趣的标签"
                en="Follow at least 5 interested tags"
              />
            }
            done={viewer.onboardingTasks.tasks.followingTag}
            onClick={
              viewer.onboardingTasks.tasks.followingTag
                ? undefined
                : openRecommendTagDialog
            }
          />
        )}

        {task === 4 && (
          <TaskItem
            order={
              <Translate zh_hant="任務四" zh_hans="任务四" en="Fourth task" />
            }
            title={
              <Translate
                zh_hant="用第一篇創作同社區問好"
                zh_hans="用第一篇创作同社区问好"
                en="Say hi to the community with your first work"
              />
            }
            subtitle={
              <Translate
                zh_hant="參與 #新人打卡 關注"
                zh_hans="参与 #新人打卡 关注"
                en="Join #新人打卡"
              />
            }
            done={viewer.onboardingTasks.tasks.article}
            onClick={
              viewer.onboardingTasks.tasks.article ? undefined : createDraft
            }
          />
        )}

        {task === 5 && (
          <TaskItem
            order={
              <Translate zh_hant="任務五" zh_hans="任务五" en="Fifth task" />
            }
            title={
              <Translate
                zh_hant="解鎖評論權限參與更多互動"
                zh_hans="解锁评论权限参与更多互动"
                en="Unlock comment feature to participate more interaction"
              />
            }
            subtitle={
              <Translate
                zh_hant="獲得拍手數 × 2 + 閱讀篇數 ≥ 10"
                zh_hans="获得拍手数 × 2 + 阅读篇数 ≥ 10"
                en="Received likes × 2 + read article ≥ 10"
              />
            }
            done={viewer.onboardingTasks.tasks.commentPermission}
          />
        )}
      </section>

      <section className={viewer.onboardingTasks.finished ? 'allDone' : ''}>
        <Dialog.Footer>
          {viewer.onboardingTasks.finished ? (
            <Dialog.Footer.Button
              type="button"
              bgColor="gold"
              textColor="white"
              onClick={hideTasks}
            >
              <Translate
                zh_hant="繼續閱讀航程"
                zh_hans="继续阅读航程"
                en="Continue your reading journey"
              />
            </Dialog.Footer.Button>
          ) : (
            <Dialog.Footer.Button type="button" onClick={hideTasks} implicit>
              <Translate
                zh_hant="不跟導航自己逛逛 😌"
                zh_hans="不跟导航自己逛逛 😌"
                en="Skip the guide and try it out yourself"
              />
            </Dialog.Footer.Button>
          )}
        </Dialog.Footer>

        {viewer.onboardingTasks.finished && (
          <>
            <hr />

            <section className="share">
              <EmbedShare
                title={`${viewer.displayName} 已解鎖新手獎賞，快點加入 Matters 獲得創作者獎勵吧`}
                path={`${sharePath}?${URL_QS.SHARE_SOURCE_ONBOARDING_TASKS.key}=${URL_QS.SHARE_SOURCE_ONBOARDING_TASKS.value}`}
                headerTitle={
                  <Translate
                    zh_hant="邀請更多好友加入星際旅行"
                    zh_hans="邀请更多好友加入星际旅行"
                    en="Invite more firends to join galaxy journey"
                  />
                }
                wrap={isLargeUp}
              />
            </section>
          </>
        )}
      </section>

      <style jsx>{styles}</style>
    </>
  )
}

export default Tasks
