import classNames from 'classnames'
import { useContext } from 'react'

import { ReactComponent as IconCheck1 } from '@/public/static/images/onboarding/check-1.svg'
import { ReactComponent as IconCheck2 } from '@/public/static/images/onboarding/check-2.svg'
import { ReactComponent as IconCheck3 } from '@/public/static/images/onboarding/check-3.svg'
import { ReactComponent as IconCheck4 } from '@/public/static/images/onboarding/check-4.svg'
import { ReactComponent as IconCheck5 } from '@/public/static/images/onboarding/check-5.svg'
import IMAGE_GALAXY from '@/public/static/images/onboarding/galaxy.png'
import { ViewerContext } from '~/components'

import styles from './styles.css'

interface Props {
  task: number
  onClick: (task: number) => void
}

const Galaxy = ({ task, onClick }: Props) => {
  const viewer = useContext(ViewerContext)

  const task1Classes = classNames({
    check: true,
    ['check-1']: true,
    checked: !!viewer.onboardingTasks.tasks.likerId,
    selected: task === 1,
  })

  const task2Classes = classNames({
    check: true,
    ['check-2']: true,
    checked: !!viewer.onboardingTasks.tasks.followee,
    selected: task === 2,
  })

  const task3Classes = classNames({
    check: true,
    ['check-3']: true,
    checked: !!viewer.onboardingTasks.tasks.followingTag,
    selected: task === 3,
  })

  const task4Classes = classNames({
    check: true,
    ['check-4']: true,
    checked: !!viewer.onboardingTasks.tasks.article,
    selected: task === 4,
  })

  const task5Classes = classNames({
    check: true,
    ['check-5']: true,
    checked: !!viewer.onboardingTasks.tasks.commentPermission,
    selected: task === 5,
  })

  return (
    <section
      className="galaxy"
      style={{ backgroundImage: `url(${IMAGE_GALAXY.src})` }}
    >
      <section className={task1Classes} onClick={() => onClick(1)}>
        <IconCheck1 />
      </section>
      <section className={task2Classes} onClick={() => onClick(2)}>
        <IconCheck2 />
      </section>
      <section className={task3Classes} onClick={() => onClick(3)}>
        <IconCheck3 />
      </section>
      <section className={task4Classes} onClick={() => onClick(4)}>
        <IconCheck4 />
      </section>
      <section className={task5Classes} onClick={() => onClick(5)}>
        <IconCheck5 />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Galaxy
