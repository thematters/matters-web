import { useState } from 'react'

import {
  RecommendAuthorDialog,
  RecommendTagDialog,
  Title,
  Translate,
} from '~/components'

import Galaxy from '../Galaxy'
import Tasks from '../Tasks'
import styles from './styles.module.css'

const OnboardingTasksWidget = () => {
  const [task, setTask] = useState(1)

  return (
    <section className={styles.widget}>
      <header>
        <Title type="feed" is="h2">
          <Translate
            zh_hant="歡迎遨遊 Matters 星際網絡"
            zh_hans="欢迎遨游 Matters 星际网络"
            en="Welcome to the Matters galaxy"
          />
        </Title>

        <section className={styles.description}>
          <p>
            <Translate
              zh_hant="導航帶你發現更多寶藏作者與優質作品。"
              zh_hans="导航带你发现更多宝藏作者与优质作品。"
              en="This guide will lead you to more precious creators and marvelous work."
            />
          </p>
          <p className={styles.bold}>
            <Translate
              zh_hant="點擊下面 5 顆星球查看任務提示！"
              zh_hans="点击下面 5 颗星球查看任务提示！"
              en="Click planets to see instructions."
            />
          </p>
        </section>
      </header>

      <Galaxy task={task} onClick={setTask} />

      <Tasks task={task} />

      <RecommendAuthorDialog />
      <RecommendTagDialog />
    </section>
  )
}

export default OnboardingTasksWidget
