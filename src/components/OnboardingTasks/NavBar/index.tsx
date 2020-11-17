import { useContext } from 'react'

import {
  Card,
  IconRight,
  Translate,
  ViewerContext,
  withIcon,
} from '~/components'

import { ReactComponent as IconOnboardLaunch } from '@/public/static/icons/onboard-launch.svg'

import OnboardingTasksDialog from '../Dialog'
import styles from './styles.css'

const NavBar = () => {
  const viewer = useContext(ViewerContext)
  const doneCount = Object.values(viewer.onboardingTasks.tasks).reduce(
    (sum, next) => sum + (next ? 1 : 0),
    0
  )

  return (
    <OnboardingTasksDialog>
      {({ open: openOnboardingTasksDialog }) => (
        <section className="nav-bar">
          <div className="l-row full">
            <div className="l-col-three-left" />
            <div className="l-col-three-right">
              <Card
                bgColor="none"
                spacing={[0, 0]}
                onClick={openOnboardingTasksDialog}
              >
                <section className="content">
                  <section className="left">
                    {withIcon(IconOnboardLaunch)({ size: 'xl-m' })}

                    <p>
                      <Translate zh_hant="星際導航" zh_hans="星际导航" />
                      <span className="highlight"> {doneCount}/5</span>
                    </p>
                  </section>

                  <section className="right">
                    <IconRight color="grey" />
                  </section>
                </section>
              </Card>
            </div>
          </div>
          <style jsx>{styles}</style>
        </section>
      )}
    </OnboardingTasksDialog>
  )
}

export default NavBar
