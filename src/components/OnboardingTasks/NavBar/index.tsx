import classNames from 'classnames'
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

interface NavBarProps {
  inArticleDetail: boolean
}

const NavBar: React.FC<NavBarProps> = ({ inArticleDetail }) => {
  const navBarClasses = classNames({
    navBar: true,
    inArticleDetail,
  })

  const viewer = useContext(ViewerContext)
  const doneCount = Object.values(viewer.onboardingTasks.tasks).reduce(
    (sum, next) => sum + (next ? 1 : 0),
    0
  )

  return (
    <OnboardingTasksDialog>
      {({ open: openOnboardingTasksDialog }) => (
        <section className={navBarClasses}>
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

          <style jsx>{styles}</style>
        </section>
      )}
    </OnboardingTasksDialog>
  )
}

export default NavBar
