import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  Dialog,
  EmbedShare,
  LikeCoinDialog,
  QueryError,
  Spinner,
  Translate,
  ViewerContext,
} from '~/components'

import { ONBOARDING_TASKS_PROGESS } from '../gql'
import styles from './styles.css'
import TaskItem from './TaskItem'

import { OnboardingTasksProgress } from '../__generated__/OnboardingTasksProgress'

const Tasks = () => {
  const viewer = useContext(ViewerContext)

  const { data, loading, error } = useQuery<OnboardingTasksProgress>(
    ONBOARDING_TASKS_PROGESS
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const hasLikerId = !!viewer.liker.likerId
  const hasFollowingTag =
    (data?.viewer?.recommendation.followingTags.totalCount || 0) >= 5
  const hasArticle = (data?.viewer?.articles.totalCount || 0) >= 1
  const hasFollowee = (data?.viewer?.followees.totalCount || 0) >= 5
  const hasCommentPremission = !viewer.isOnboarding
  const isAllDone =
    hasLikerId &&
    hasFollowingTag &&
    hasArticle &&
    hasFollowee &&
    hasCommentPremission

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
              done={hasLikerId}
              onClick={hasLikerId ? undefined : open}
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
          done={hasFollowee}
        />
        <TaskItem
          title={
            <Translate
              zh_hant="追蹤 5 個感興趣的標籤"
              zh_hans="追踪 5 个感兴趣的标签"
            />
          }
          done={hasFollowingTag}
        />
        <TaskItem
          title={
            <Translate
              zh_hant="創作第一篇作品和社區說聲 Hi"
              zh_hans="创作第一篇作品和社区说声 Hi "
            />
          }
          subtitle={
            <Translate
              zh_hant="參與 #新人打卡 關注"
              zh_hans="参与 #新人打卡 关注"
            />
          }
          done={hasArticle}
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
          done={hasCommentPremission}
        />
      </ul>

      <section className={isAllDone ? 'allDone' : ''}>
        <Dialog.Footer>
          {isAllDone ? (
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
            <Dialog.Footer.Button
              type="button"
              onClick={() => {
                // TODO
              }}
              implicit
            >
              <Translate
                zh_hant="不跟導航自己逛逛 😌"
                zh_hans="不跟导航自己逛逛 😌"
              />
            </Dialog.Footer.Button>
          )}
        </Dialog.Footer>

        {isAllDone && (
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
