import { useApolloClient } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  Dialog,
  EmbedShare,
  LanguageContext,
  LikeCoinDialog,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'

import {
  ADD_TOAST,
  SHARE_SOURCCE,
  SHARE_SOURCCE_ONBOARDING_TASKS,
  STORAGE_KEY_ONBOARDING_TASKS,
} from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  routerPush,
  storage,
  toPath,
  translate,
} from '~/common/utils'

import styles from './styles.css'
import TaskItem from './TaskItem'

import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'

const Tasks = () => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const client = useApolloClient()
  const isLargeUp = useResponsive('lg-up')

  const [putDraft] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang }),
      tags: ['新人打卡'],
    },
  })
  const createDraft = async () => {
    try {
      analytics.trackEvent('click_button', {
        type: 'write',
      })
      const result = await putDraft()
      const { slug, id } = result?.data?.putDraft || {}

      if (slug && id) {
        const path = toPath({ page: 'draftDetail', slug, id })
        routerPush(path.href, path.as)
      }
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error, lang)

      if (!messages[codes[0]]) {
        return null
      }

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: messages[codes[0]],
          },
        })
      )
    }
  }

  const hideTasks = () => {
    client.writeData({
      id: 'ClientPreference:local',
      data: {
        onboardingTasks: { __typename: 'OnboardingTasks', enabled: false },
      },
    })

    const storedOnboardingTasks = storage.get(STORAGE_KEY_ONBOARDING_TASKS)
    storage.set(STORAGE_KEY_ONBOARDING_TASKS, {
      ...storedOnboardingTasks,
      enabled: false,
    })
  }

  const sharePath = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  }).as

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
              done={viewer.onboardingTasks.tasks.likerId}
              onClick={viewer.onboardingTasks.tasks.likerId ? undefined : open}
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
          done={viewer.onboardingTasks.tasks.followee}
        />
        <TaskItem
          title={
            <Translate
              zh_hant="追蹤 5 個感興趣的標籤"
              zh_hans="追踪 5 个感兴趣的标签"
            />
          }
          done={viewer.onboardingTasks.tasks.followingTag}
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
          done={viewer.onboardingTasks.tasks.article}
          onClick={
            viewer.onboardingTasks.tasks.article ? undefined : createDraft
          }
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
          done={viewer.onboardingTasks.tasks.commentPermission}
        />
      </ul>

      <section className={viewer.onboardingTasks.finished ? 'allDone' : ''}>
        <Dialog.Footer>
          {viewer.onboardingTasks.finished ? (
            <Dialog.Footer.Button
              type="button"
              bgColor="gold"
              textColor="white"
              onClick={hideTasks}
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

            <section className="share">
              <EmbedShare
                title={`${viewer.displayName} 已解鎖新手獎賞，快點加入 Matters 獲得創作者獎勵吧`}
                path={`${sharePath}?${SHARE_SOURCCE}=${SHARE_SOURCCE_ONBOARDING_TASKS}`}
                headerTitle={
                  <Translate
                    zh_hant="邀請更多好友加入星際旅行"
                    zh_hans="邀请更多好友加入星际旅行"
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
